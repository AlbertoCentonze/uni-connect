import { useState } from 'react';
import { View, Text, FlatList, Image, TextInput, TouchableOpacity} from 'react-native';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Contact = {
  uid: string,
  firstName: string,
  lastName: string,
  profilePictureUrl?: string,
  description: string,
  interests: string[],
  qualifications: string[]
}

const dummyData: Contact[] = [
  {uid: '1', firstName: 'Jocović', lastName: 'Dellpouelo', profilePictureUrl: '', description: 'This guy is very weird', interests: ['surfing', 'machine learning'], qualifications: []},
  {uid: '2', firstName: 'Stephano', lastName: 'Carasto', profilePictureUrl: '', description: 'No description', interests: [], qualifications: ['surfing', 'machine learning']},
  {uid: '3', firstName: 'Henrique', lastName: 'Nique', profilePictureUrl: '', description: 'Good question', interests: ['surfing'], qualifications: ['machine learning']},
  {uid: '4', firstName: 'Hervé', lastName: 'Delamontagne', profilePictureUrl: '', description: 'Description, description, description, loooooooooong descriiiiiiiiiiption, this is a veeeeeeeeeeeeeeeeeeeeeery loooooooooooooooooooooooooooooooooooooooooooong descriiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiption alala', interests: ['running'], qualifications: ['bowling']},
  {uid: '5', firstName: 'Charles', lastName: 'Dupond', profilePictureUrl: '', description: 'Aaaaaaaaaaaaaaaaaaaa v v v v v v v v v a a a a a a a a a a a a a a a a a a a a a a a aaa a a a a a a a a a a a a a aa a a a a a a a a a a a a a a a a a a a a a a aaa a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a aaa a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a aaa a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a aaa a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a', interests: ['machine learning'], qualifications: ['running', 'bowling']},
  {uid: '6', firstName: 'Charlotte', lastName: 'Motte', profilePictureUrl: '', description: 'Bbbbbbbbbbbbbbbbbb', interests: ['walking'], qualifications: ['running']},
  {uid: '7', firstName: 'Charlović', lastName: 'Poutine', profilePictureUrl: '', description: 'Description 7', interests: [], qualifications: ['python', 'java', 'C++']},
  {uid: '8', firstName: 'Stephanović', lastName: 'Vladimir', profilePictureUrl: '', description: 'I love fish', interests: ['surfing', 'machine learning'], qualifications: ['biology']},
  {uid: '9', firstName: 'Lulu', lastName: 'Nom', profilePictureUrl: '', description: 'I love bamboo', interests: ['surfing', 'machine learning'], qualifications: ['litterature']},
  {uid: '10', firstName: 'Lili', lastName: 'De', profilePictureUrl: '', description: '19 + 4 = 22', interests: ['surfing', 'machine learning'], qualifications: ['a', 'b', 'c', 'd', 'e', 'f', 'h']},
  {uid: '11', firstName: 'Lala', lastName: 'Famille', profilePictureUrl: '', description: 'I\'m doing university for fun', interests: ['a', 'b', 'c', 'd', 'e', 'f', 'h'], qualifications: ['a', 'b', 'c', 'd', 'e', 'f', 'h']},
  {uid: '12', firstName: 'Abc', lastName: 'Onu', profilePictureUrl: '', description: 'Didn\'t want a description', interests: [], qualifications: ['a', 'b', 'c', 'd', 'e', 'f', 'h']},
  {uid: '13', firstName: 'Def', lastName: 'Steph', profilePictureUrl: '', description: '-', interests: ['movies'], qualifications: ['history']},
  {uid: '14', firstName: 'Hij', lastName: 'Non', profilePictureUrl: '', description: 'Mataphisical question', interests: [], qualifications: []},
]

export const ContactListScreen = () => {
  const [filteredContacts, setFilteredContacts] = useState(dummyData);
  const [searchText, setSearchText] = useState('');
  const [selectedTab, setSelectedTab] = useState('Plain View');
  const insets = useSafeAreaInsets()
 
  const handleSearch = (text: string) => {
    setSearchText(text);
    if(text){
        const filtered = dummyData.filter((contact) =>
          `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(text.toLowerCase())
        )
        setFilteredContacts(filtered);
    }else{
        setFilteredContacts(dummyData);
    }
  }

  const RenderOneContact = ({ item } : { item : Contact }) => (
    <View style={styles.cardContainer}>
      {item.profilePictureUrl? (
        <Image
          style={styles.profilePicture}
          source={{uri: item.profilePictureUrl}}
        />
      ) : (
        <View style={styles.profilePicture}>
          <Ionicons name="person" size={50} color="black" />
        </View>
      )}
      <View style={styles.container}>
        <Text 
          style={styles.contactDescription}
          numberOfLines={3}>
            {item.description}
        </Text>
        <View style={styles.container}>
          <Text style={styles.contactName}>{item.firstName}</Text>
          <Text style={styles.contactFriendType}>friend</Text>
        </View>
      </View>
    </View>
  )

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>  
      <View style={styles.viewChoiceContainer}>
        <TouchableOpacity style={styles.contactList} onPress={() => setSelectedTab('Plain View')}>
          <Text style={[styles.greyLightText, selectedTab === 'Plain View' && styles.darkBoldText]}>
            Plain View
          </Text>
          <View style={[styles.viewCHoiceUnderLine, selectedTab === 'Graph View' && styles.invisibleBackground]}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactList} onPress={() => setSelectedTab('Graph View')}>
          <Text style={[styles.greyLightText, selectedTab === 'Graph View' && styles.darkBoldText]}>
            Graph View
          </Text>
          <View style={[styles.viewCHoiceUnderLine, selectedTab === 'Plain View' && styles.invisibleBackground]}/>
        </TouchableOpacity>
      </View>

      <View>
        <TextInput 
          style = {styles.searchBar}
          placeholder="Search..." 
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      
      <View style={styles.container}>
        <FlatList
          data={filteredContacts}
          renderItem={RenderOneContact}
          keyExtractor={(contact) => contact.uid}
        />
      </View>
    </View>
  )

}


