import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TodoTask from '../components/todoTask'
import { auth, fireStoreDB } from '../firebase';
import { async } from '@firebase/util';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [seletedId, setSelectedId] = useState(true)
  const navigation = useNavigation()

  const onPressCheckbox = async (id) => {
    try {
        await updateDoc(doc(fireStoreDB, 'todoTasks', id), {
            status : true
        });
        setSelectedId(!seletedId)
        await getTasks();
        return [...tasks];
    } catch (error) {
        alert("Error occured with update : " + error.message);
    }
}
const onPressDelete = async (id) => {
    try {
        await deleteDoc(doc(fireStoreDB, 'todoTasks', id));
        alert("Task removed")
        await getTasks();
        return [...tasks];
        setSelectedId(!seletedId)
    } catch (error) {
        alert("Error occured when removing task : " + error.message);
    }
}

const handleLogout = () => {
  signOut(fireAuth).then(() => {
    alert("Signed out successfully")
  }).catch((error) => {
    alert(error.message)
  });
}

  const fireAuth = auth;
  const user = fireAuth.currentUser;

  const handleAddTask = async () => {
    console.log({taskName, uid : user.uid, status: false});
    try {
      const docRef = await addDoc(collection(fireStoreDB, "todoTasks"), {
        taskName,
        uid : user.uid, 
        status: false
      });
      console.log("Document written with ID: ", docRef.id);
      setSelectedId(!seletedId)
      await getTasks();
      console.log("====ran getTasks after delete===");
      console.log("--------------      \n");
      console.log(tasks);
      console.log("----------------------------");
      return [...tasks];
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setTaskName('');
  };

      const getTasks = async () => {
      const todoRef = collection(fireStoreDB, "todoTasks");
    // Create a query against the collection.
      const tasksList = query(todoRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(tasksList);
      let returnedTasks = [];
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

        returnedTasks.push({id: doc.id, data: doc.data()});
      });
      console.log(returnedTasks);
      setTasks(returnedTasks)
      console.log(tasks);
      setIsLoading(true)
      setSelectedId(!seletedId)
    }

  useEffect( () => {
    getTasks();
    const unsubscribe = onAuthStateChanged(fireAuth, (user) => {
        if(!user) {
            navigation.replace('Login');
        }
    })
    return unsubscribe
  }, [])
  

  return (
    <View style={styles.listItemContainer}>
      <View style={styles.logoutButtonContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      {isLoading?
      <View style={styles.flatList}>
        <FlatList
        keyExtractor={item => item.id}
        data={tasks}
        extraData={tasks.length}
        renderItem={({item, index}) => {
          console.log('========' + item);
          return(<TodoTask task={item.data} id={item.id} onPressCheckbox={onPressCheckbox} onPressDelete={onPressDelete}/>)
        }}
      />
      </View>
        : '' }
      <View style={styles.container}>
        <Text style={styles.label}>Add Task</Text>
        <TextInput
          style={styles.input}
          value={taskName}
          onChangeText={setTaskName}
          placeholder="Enter task name"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            title="Add Task"
            onPress={handleAddTask}
            disabled={!taskName}
          >
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
    padding: 10,
    width: '100%'
  },
  flatList: {
    height: '70%',
    flexGrow: 0
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
    color: '#1a5096',
  },
  button: {
    backgroundColor: '#1a5096',
    width: '40%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    color: 'white'
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: '700'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
  },
  logoutButtonContainer : {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  logoutButton : {
    backgroundColor: '#732620',
    width: '20%',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    color: 'white'
  },
  logoutButtonText : {
    color: 'white',
    fontWeight: '300'
  },
})