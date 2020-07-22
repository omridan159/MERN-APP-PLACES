import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';


const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'LightHouse',
    imageUrl:
      'https://www.kahane.co.il/wp-content/uploads/2018/09/DSC_8103-e1536216207127.jpg',
    description: 'The Best Club In All Tel Aviv Wow So Cool!',
    address: 'Namal Tel Aviv',
    creator: 'u1',
    location: {
      lat: 32.0730667,
      lng: 34.7703666,
    },
  },
  {
    id: 'p2',
    title: 'Shalvata',
    imageUrl:
      'https://www.kahane.co.il/wp-content/uploads/2018/09/DSC_8129-e1536216272820.jpg',
    description: 'The Best Club In All ISrael Wow So GOOD!',
    address: 'Namal Tel Aviv',
    creator: 'u2',
    location: {
      lat: 32.0950798,
      lng: 34.7751643,
    },
  },
];

const UserPlaces = () => {
  
    const userId = useParams().userId;
    
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)


  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
