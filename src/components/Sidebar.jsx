import { Avatar, Button } from '@material-tailwind/react'
import React, { useContext, useEffect, useState } from 'react'
import { FaXTwitter } from 'react-icons/fa6'
import { GrHomeRounded, GrNotification } from 'react-icons/gr'
import { IoPersonOutline } from 'react-icons/io5'
import { LuMail } from 'react-icons/lu'
import { PiMagnifyingGlassLight } from 'react-icons/pi'
import { BrowserRouter, Link, useNavigate } from 'react-router-dom'
import {Card,Typography, List, ListItem, ListItemPrefix, ListItemSuffix, Chip,} from "@material-tailwind/react";
import { PresentationChartBarIcon, ShoppingBagIcon, UserCircleIcon, Cog6ToothIcon, InboxIcon, PowerIcon,} from "@heroicons/react/24/solid";
import { useAuth } from '../hooks/useAuth'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import { AuthContext } from '../contexts/AuthContext'

function Sidebar() {
  const { signout, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const db = getFirestore(app);
  const [userArray, setUserArray] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const uid = currentUser.uid;
        const Users = query(collection(db, "users"));
        const querySnapshot = await getDocs(Users);
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setUserArray(usersList);
        const userArray = usersList.find((user) => user.id === uid);
        setUserName(userArray?.userName);
      } else {
        console.log('user is signed out');
      }
    };
    fetchData();
  }, [currentUser, db]);

  const handleClick = (name) => {
    if (name === 'LogOut') {
      signout(navigate);
    }
  };

  const sidebarList = [
    { "Name": "Home", "Link": "/", "icon": GrHomeRounded },
    { "Name": "Explore", "Link": "/explore", "icon": PiMagnifyingGlassLight },
    { "Name": "Notifications", "Link": "/notification", "value": 14, "icon": GrNotification },
    { "Name": "Message", "Link": "/message", "icon": LuMail },
    { "Name": "Profile", "Link": "/profile", "icon": IoPersonOutline },
    { "Name": "LogOut", "onClick": signout, "icon": PowerIcon },
  ];

  return (
    <>
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            <FaXTwitter className="" />
          </Typography>
        </div>
        <List>
            {sidebarList.map((listitem, index) => (
              <Link key={index} to={listitem.Link} onClick={() => handleClick(listitem.Name)}>
                <ListItem>
                  <ListItemPrefix>
                    <listitem.icon className="h-5 w-5" />
                  </ListItemPrefix>
                  {listitem.Name}
                  <ListItemSuffix>
                    {listitem.Name === 'Notifications' ? <Chip value={listitem.value} size="sm" variant="ghost" color="blue-gray" className="rounded-full" /> : ''}
                  </ListItemSuffix>
                </ListItem>
              </Link>
            ))}         
        </List>
        <Button className="mt-11 bg-blue-800">Post</Button>
        <Avatar className="mt-8" src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" size="xl" />
        <h3>{userName}</h3>
        <p className='text-gray-500'>@{userName}</p>
      </Card>
    </>
  );
}

export default Sidebar;
