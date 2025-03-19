import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons'; // Import icons from @expo/vector-icons

// Dummy Data
const ALL_COMMUNITIES = [
  {
    id: '1',
    name: 'Neighborhood Watch',
    members: 1234,
    image: 'https://images.unsplash.com/photo-1625243339020-7c5f05c3f021?w=800&auto=format&fit=crop&q=60',
    description: 'Local community for neighborhood safety alerts and support.',
    messages: [
      { id: '1', user: 'Naina', message: 'Hey everyone! Just wanted to report that the street lights on Oak Avenue are working again.', time: '10:30 AM' },
      { id: '2', user: 'Gowthami', message: 'That\'s great news! I noticed they fixed the emergency call box too.', time: '10:32 AM' },
      { id: '3', user: 'Mahathi', message: 'Thanks for the update! Feel much safer walking home now.', time: '10:35 AM' },
    ],
  },
  {
    id: '2',
    name: 'Safe Transit Group',
    members: 856,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=60',
    description: 'Updates and support for safe public transportation.',
  },
  {
    id: '3',
    name: 'Emergency Response',
    members: 2341,
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&auto=format&fit=crop&q=60',
    description: 'Quick response network for emergency situations.',
  },
  {
    id: '4',
    name: 'Self Defense Network',
    members: 945,
    image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&auto=format&fit=crop&q=60',
    description: 'Tips, classes, and support for self-defense training.',
    messages: [
      { id: '1', user: 'Nada', message: 'New self-defense class starting next week!', time: '2:00 PM' },
      { id: '2', user: 'Gowthami', message: 'Can beginners join?', time: '2:05 PM' },
      { id: '3', user: 'Mahathi', message: 'Absolutely! All skill levels welcome.', time: '2:07 PM' },
    ],
  },
];

const FEATURED_GROUPS = [
  {
    id: '1',
    name: 'Safety Alerts',
    icon: <MaterialIcons name="warning" size={24} color="#E91E63" />, // Replaced AlertCircle
  },
  {
    id: '2',
    name: 'Safe Locations',
    icon: <MaterialCommunityIcons name="map-marker" size={24} color="#E91E63" />, // Replaced MapPin
  },
  {
    id: '3',
    name: 'Guardian Network',
    icon: <MaterialCommunityIcons name="shield" size={24} color="#E91E63" />, // Replaced Shield
  },
];

export default function CommunityScreen() {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false); // State for create community modal
  const [isJoinModalVisible, setIsJoinModalVisible] = useState(false); // State for join community modal
  const [newCommunityName, setNewCommunityName] = useState(''); // State for new community name
  const [userCommunities, setUserCommunities] = useState([
    ALL_COMMUNITIES[0], // Pre-joined: Neighborhood Watch
    ALL_COMMUNITIES[3], // Pre-joined: Self Defense Network
  ]); // State for communities the user has joined

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        user: 'You',
        message: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleCreateCommunity = () => {
    if (newCommunityName.trim()) {
      // Add the new community to the list
      const newCommunity = {
        id: Date.now().toString(),
        name: newCommunityName,
        members: 1, // Default to 1 member (the creator)
        image: 'https://images.unsplash.com/photo-1625243339020-7c5f05c3f021?w=800&auto=format&fit=crop&q=60', // Default image
        description: 'A new community for safety and support.',
        messages: [],
      };
      setUserCommunities([newCommunity, ...userCommunities]); // Add the new community to the user's list
      setIsCreateModalVisible(false); // Close the modal
      setNewCommunityName(''); // Clear the input
      Alert.alert('Success', 'Community created successfully!');
    } else {
      Alert.alert('Error', 'Please enter a community name.');
    }
  };

  const handleJoinCommunity = (community) => {
    if (!userCommunities.some((c) => c.id === community.id)) {
      setUserCommunities([community, ...userCommunities]); // Add the community to the user's list
      Alert.alert('Success', `You have joined ${community.name}!`);
    } else {
      Alert.alert('Info', `You are already a member of ${community.name}.`);
    }
    setIsJoinModalVisible(false); // Close the modal
  };

  // Filter communities that are not yet joined
  const availableCommunities = ALL_COMMUNITIES.filter(
    (community) => !userCommunities.some((c) => c.id === community.id)
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Image source={require("../../assets/women-icon.png")} style={styles.logo} />
          <View>
              <Text style={styles.headerTitle}>Community Page</Text>
          </View>
      </View>
      {/* Create Community Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#E91E63' }]}
          onPress={() => setIsCreateModalVisible(true)}>
          <Feather name="plus" size={24} color="#FFFFFF" /> {/* Replaced Plus */}
          <Text style={styles.actionButtonText}>Create Community</Text>
        </TouchableOpacity>

        {/* Join Community Button */}
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
          onPress={() => setIsJoinModalVisible(true)}>
          <Feather name="user-plus" size={24} color="#FFFFFF" /> {/* Replaced UserPlus */}
          <Text style={styles.actionButtonText}>Join Community</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.mainContainer}>
        {/* Featured Groups Section */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.featuredGrid}>
            {FEATURED_GROUPS.map((group) => (
              <TouchableOpacity key={group.id} style={styles.featuredItem}>
                {group.icon}
                <Text style={styles.featuredText}>{group.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Communities List */}
        <View style={styles.communitiesSection}>
          <Text style={styles.sectionTitle}>Your Communities</Text>
          {userCommunities.map((community) => (
            <TouchableOpacity
              key={community.id}
              style={styles.communityCard}
              onPress={() => {
                setSelectedCommunity(community);
                setMessages(community.messages || []);
              }}>
              <Image
                source={{ uri: community.image }}
                style={styles.communityImage}
              />
              <View style={styles.communityInfo}>
                <Text style={styles.communityName}>{community.name}</Text>
                <Text style={styles.communityDescription}>
                  {community.description}
                </Text>
                <View style={styles.memberCount}>
                  <Feather name="users" size={16} color="#757575" /> {/* Replaced Users */}
                  <Text style={styles.memberText}>
                    {community.members.toLocaleString()} members
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Chat Modal */}
      <Modal
        visible={selectedCommunity !== null}
        animationType="slide"
        onRequestClose={() => setSelectedCommunity(null)}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}>
          {/* Chat Header */}
          <View style={styles.chatHeader}>
            <View style={styles.chatHeaderContent}>
              <Image
                source={{ uri: selectedCommunity?.image }}
                style={styles.chatHeaderImage}
              />
              <View style={styles.chatHeaderInfo}>
                <Text style={styles.chatHeaderTitle}>
                  {selectedCommunity?.name}
                </Text>
                <Text style={styles.chatHeaderMembers}>
                  {selectedCommunity?.members.toLocaleString()} members
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setSelectedCommunity(null)}
              style={styles.closeButton}>
              <Feather name="x" size={24} color="#666" /> {/* Replaced X */}
            </TouchableOpacity>
          </View>

          {/* Chat Messages */}
          <ScrollView style={styles.chatMessages}>
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.messageContainer,
                  msg.user === 'You' ? styles.sentMessage : styles.receivedMessage,
                ]}>
                <View style={styles.messageContent}>
                  <Text style={styles.messageUser}>{msg.user}</Text>
                  <Text style={styles.messageText}>{msg.message}</Text>
                  <Text style={styles.messageTime}>{msg.time}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Message Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Type a message..."
              placeholderTextColor="#666"
              multiline
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              style={styles.sendButton}>
              <Feather name="send" size={24} color="#E91E63" /> {/* Replaced Send */}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Create Community Modal */}
      <Modal
        visible={isCreateModalVisible}
        animationType="slide"
        onRequestClose={() => setIsCreateModalVisible(false)}>
        <View style={styles.createModalContainer}>
          <Text style={styles.createModalTitle}>Create a New Community</Text>
          <TextInput
            style={styles.createInput}
            placeholder="Enter community name"
            value={newCommunityName}
            onChangeText={setNewCommunityName}
          />
          <TouchableOpacity
            style={styles.createModalButton}
            onPress={handleCreateCommunity}>
            <Text style={styles.createModalButtonText}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createModalCancelButton}
            onPress={() => setIsCreateModalVisible(false)}>
            <Text style={styles.createModalCancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Join Community Modal */}
      <Modal
        visible={isJoinModalVisible}
        animationType="slide"
        onRequestClose={() => setIsJoinModalVisible(false)}>
        <View style={styles.joinModalContainer}>
          <Text style={styles.joinModalTitle}>Join a Community</Text>
          <ScrollView>
            {availableCommunities.map((community) => (
              <TouchableOpacity
                key={community.id}
                style={styles.joinCommunityCard}
                onPress={() => handleJoinCommunity(community)}>
                <Image
                  source={{ uri: community.image }}
                  style={styles.joinCommunityImage}
                />
                <View style={styles.joinCommunityInfo}>
                  <Text style={styles.joinCommunityName}>{community.name}</Text>
                  <Text style={styles.joinCommunityDescription}>
                    {community.description}
                  </Text>
                  <View style={styles.joinMemberCount}>
                    <Feather name="users" size={16} color="#757575" /> {/* Replaced Users */}
                    <Text style={styles.joinMemberText}>
                      {community.members.toLocaleString()} members
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.joinModalCancelButton}
            onPress={() => setIsJoinModalVisible(false)}>
            <Text style={styles.joinModalCancelButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  mainContainer: {
    flex: 1,
  },
  featuredSection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#212121',
  },
  featuredGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featuredItem: {
    alignItems: 'center',
    backgroundColor: '#FFF5F8',
    padding: 16,
    borderRadius: 12,
    width: '30%',
  },
  featuredText: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
    color: '#E91E63',
  },
  communitiesSection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  communityCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  communityImage: {
    width: 100,
    height: 100,
  },
  communityInfo: {
    flex: 1,
    padding: 12,
  },
  communityName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#212121',
  },
  communityDescription: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  memberCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#757575',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  chatHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatHeaderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
  },
  chatHeaderMembers: {
    fontSize: 14,
    color: '#757575',
  },
  closeButton: {
    padding: 8,
  },
  chatMessages: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  sentMessage: {
    alignItems: 'flex-end',
  },
  receivedMessage: {
    alignItems: 'flex-start',
  },
  messageContent: {
    backgroundColor: '#FFF5F8',
    padding: 12,
    borderRadius: 12,
    maxWidth: '80%',
  },
  messageUser: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E91E63',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    color: '#212121',
  },
  messageTime: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    fontSize: 14,
    color: '#212121',
  },
  sendButton: {
    padding: 12,
  },
  createModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  createModalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#212121',
  },
  createInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  createModalButton: {
    backgroundColor: '#E91E63',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  createModalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  createModalCancelButton: {
    marginTop: 12,
    padding: 12,
    width: '100%',
    alignItems: 'center',
  },
  createModalCancelButtonText: {
    color: '#E91E63',
    fontSize: 16,
    fontWeight: '600',
  },
  joinModalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  joinModalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#212121',
  },
  joinCommunityCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  joinCommunityImage: {
    width: 80,
    height: 80,
  },
  joinCommunityInfo: {
    flex: 1,
    padding: 12,
  },
  joinCommunityName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#212121',
  },
  joinCommunityDescription: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  joinMemberCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinMemberText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#757575',
  },
  joinModalCancelButton: {
    backgroundColor: '#E91E63',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  joinModalCancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    backgroundColor: "#ff2e79", // Dark maroon
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: { 
      width: 50, 
      height: 50, 
      borderRadius: 25, 
      marginRight: 10 
  },
  headerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#F9D8E2",
      textTransform: "uppercase",
  },
  headerSubtitle: {
      fontSize: 16,
      fontStyle: "italic",
      color: "#F9D8E2",
  },
});