import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { useSongStore } from "../store/songStore";
import { useTheme } from "../theme/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { getBestImage } from "../utils/getImage";
import { getPrimaryArtists } from "../utils/songHelpers";

export default function MiniPlayer() {
  const { currentSong, isPlaying, togglePlay, playNext } = useSongStore();
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  if (!currentSong) return null;

  return (
    <Pressable
      onPress={() => navigation.navigate("Player")}
      style={[
        tw`flex-row items-center px-3 py-3`,
        {
          backgroundColor: theme.card,
        },
      ]}
    >
      <Image
        source={{ uri: getBestImage(currentSong.image) }}
        style={tw`w-10 h-10 rounded-md mr-3 bg-gray-700`}
      />

      <View style={tw`flex-1`}>
        <Text
          numberOfLines={1}
          style={[tw`text-sm font-medium`, { color: theme.text }]}
        >
          {currentSong.name} – {getPrimaryArtists(currentSong)}
        </Text>
      </View>

      <View style={tw`flex-row items-center`}>
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          style={tw`px-2`}
        >
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={24}
            color={theme.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            playNext();
          }}
        >
          <Ionicons name="play-skip-forward" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}
