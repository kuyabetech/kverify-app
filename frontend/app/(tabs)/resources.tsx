import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';

const API_URL = 'http://localhost:4000';

type Resource = {
  id: string;
  title: string;
  type: string;
  department: string;
  level: number;
  downloads: number;
};

export default function ResourcesScreen() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: any) => state.user.user);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get<Resource[]>(`${API_URL}/resources?department=CSC&level=300`);
        setResources(res.data);
      } catch (err) {
        setResources([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  if (loading) {
    return <ActivityIndicator className="mt-10" size="large" color="#006747" />;
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-4 text-green-800">Resources</Text>
      <FlatList
        data={resources}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View className="border rounded p-4 mb-3 bg-gray-50">
            <Text className="font-semibold">{item.title}</Text>
            <Text className="text-xs text-gray-500">{item.type} | {item.department} | Level {item.level}</Text>
            <Text className="text-xs mt-1">Downloads: {item.downloads}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No resources found.</Text>}
      />
    </View>
  );
}
