import { Text, View } from "react-native";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

type Game = {
    player1Name: string
    player2Name: string
    leftScore: number
    rightScore: number
    date: number
}

async function loadPrevGame(setPrevGame: (game: Game) => void) {
    try {
        const storedGame = await AsyncStorage.getItem("ladderGolf1")
        if (storedGame !== null) {
            setPrevGame(JSON.parse(storedGame))
        }
    } catch (e) {
        console.error(e)
    }
}

export default function Page() {
    const [prevGame, setPrevGame] = useState<Game>(null)

    useEffect(() => {
        loadPrevGame(setPrevGame)
    }, [])

    return (
        <View className="flex-1 items-center p-6">
            {prevGame &&
                <PrevGame prevGame={prevGame} />
            }
            <View className="flex-2 justify-center max-w-5xl py-20 mx-auto">
                <Text className="font-bold text-6xl text-slate-800">Ladder Golf</Text>
                <Text className="text-3xl text-slate-600">Start a new game of ladder golf</Text>
                <View className="p-1 border-2 border-slate-600 w-full mt-6 rounded">
                    <Link className="text-2xl p-1 text-slate-500"
                        href="/modal">
                        Start game
                    </Link>
                </View>
            </View>
        </View>
    );
}

type PrevGameProps = {
    prevGame: Game
}

function PrevGame({ prevGame }: PrevGameProps) {
    return (
        <View className="mt-2 border-2 p-5 w-2/3 rounded border-slate-600">
            <Text className="text-center text-xl text-slate-800">Last game:</Text>
            <Text className="text-2xl py-4 text-slate-700">{prevGame.player1Name} scored: {prevGame.leftScore}</Text>
            <Text className="text-2xl py-4 text-slate-700">{prevGame.player2Name} scored: {prevGame.rightScore}</Text>
        </View>
    )
}
