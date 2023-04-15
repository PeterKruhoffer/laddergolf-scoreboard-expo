import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput } from "react-native";
import { player1Atom, player2Atom } from "..";
import { useAtom } from "jotai";
import { Link } from "expo-router";

function Modal() {
    const [player1Name, setPlayer1Name] = useAtom(player1Atom)
    const [player2Name, setPlayer2Name] = useAtom(player2Atom)

    return (
        <View className="flex-1 items-center py-10">
            <StatusBar style="dark" />
            <TextInput
                onChangeText={setPlayer1Name}
                value={player1Name}
                placeholder="Player 1 name"
                className="h-12 w-1/2 px-2 text-xl border-2 border-black my-5" />
            <TextInput
                onChangeText={setPlayer2Name}
                value={player2Name}
                placeholder="Player 2 name"
               className="h-12 w-1/2 px-2 text-xl border-2 border-black my-5" />

            <Link href="/scoreboard" replace={true} 
                className="border-2 border-black p-3 bottom-12 absolute">
                <Text className="text-2xl">Start Game</Text>
            </Link>
        </View>
    )
}

export default Modal
