import { View, Text, Pressable, Alert } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { player1Atom, player2Atom } from "..";
import { useAtom } from "jotai";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Game = {
  player1Name: string;
  player2Name: string;
  leftScore: number;
  rightScore: number;
  date: number;
};

async function saveGame(game: Game) {
  try {
    await AsyncStorage.setItem("ladderGolf1", JSON.stringify(game));
  } catch (e) {
    console.error(e);
  }
}

function Scoreboard() {
  const [player1Name, setPlayer1Name] = useAtom(player1Atom);
  const [player2Name, setPlayer2Name] = useAtom(player2Atom);
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  const router = useRouter();

  //TODO:
  //Game history screen?
  //Limit saved games to 5?

  useEffect(() => {
    if (leftScore >= 21 || rightScore >= 21) {
      if (leftScore >= 21) {
        const game: Game = {
          player1Name: player1Name,
          player2Name: player2Name,
          leftScore: leftScore,
          rightScore: rightScore,
          date: Date.now(),
        };
        createAlert(player1Name + " won!", router, setPlayer1Name, setPlayer2Name, game);
      } else {
        const game: Game = {
          player1Name: player1Name,
          player2Name: player2Name,
          leftScore: leftScore,
          rightScore: rightScore,
          date: Date.now(),
        };

        createAlert(player2Name + " won!", router, setPlayer2Name, setPlayer1Name, game);
      }
    }
  }, [leftScore, rightScore]);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Scoreboard",
        }}
      />
      <View className="bg-white h-full flex-1 flex-row justify-center items-center py-3">
        <View className="w-1/2 border-r-2 releative border-slate-200 h-full flex-1 justify-evenly items-center">
          <Text className="text-2xl top-0 absolute underline">
            {player1Name}
          </Text>
          <Text className="text-2xl top-4 py-2 absolute">current score:</Text>
          <Text className="text-2xl top-12 py-2 absolute">{leftScore}</Text>
          <Ladder point={3} score={leftScore} setScore={setLeftScore} />
          <Ladder point={2} score={leftScore} setScore={setLeftScore} />
          <Ladder point={1} score={leftScore} setScore={setLeftScore} />
        </View>
        <View className="w-1/2 border-l-2 relative border-slate-200 h-full flex-1 justify-evenly items-center">
          <Text className="text-2xl top-0 absolute underline">
            {player2Name}
          </Text>
          <Text className="text-2xl py-2 absolute top-4">current score:</Text>
          <Text className="text-2xl absolute top-12 py-2">{rightScore}</Text>
          <Ladder point={3} score={rightScore} setScore={setRightScore} />
          <Ladder point={2} score={rightScore} setScore={setRightScore} />
          <Ladder point={1} score={rightScore} setScore={setRightScore} />
        </View>
      </View>
    </>
  );
}

export default Scoreboard;

type LadderProps = {
  point: number;
  score: number;
  setScore: (score: number) => void;
};

function Ladder({ point, score, setScore }: LadderProps) {
  return (
    <Pressable
      className="relative w-full"
      onPress={() => {
        setScore(point + score);
      }}
    >
      <View className="absolute top-0 left-0 py-1 bg-black w-full my-4 h-1" />
      <Text className="text-black text-3xl py-1 text-center absolute -top-1 left-[45%] w-6 bg-white">
        {point}
      </Text>
    </Pressable>
  );
}

function createAlert(
  title: string,
  router: any,
  resetName1: any,
  resetName2: any,
  game: Game,
) {
  Alert.alert(title, null, [
    {
      text: "Home",
      onPress: () => {
        router.back();
        resetName1("");
        resetName2("");
      },
    },
    {
      text: "Save",
      onPress: () => {
        //saveToLocalStorage
        saveGame(game);

        router.back();
        resetName1("");
        resetName2("");
      },
    },
  ]);
}
