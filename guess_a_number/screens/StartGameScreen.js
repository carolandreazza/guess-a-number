import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'

import Card from '../components/Card'
import Input from '../components/Input'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import NumberContainer from '../components/NumberContainer'
import Colors from '../constants/colors'

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))// deixa inserir só numeros
      }

    const resetInputHandler = () => {
        setEnteredValue('')
        setConfirmed(false)
    }
    const comfirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 
                'Number has to be a number between 1 and 99.', 
                [{text: 'Okay', style:'destructive', onPress: resetInputHandler }]
            )
            return;
        }
        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        setEnteredValue('')
        Keyboard.dismiss()
    }

    let comfirmedOutput

    if (confirmed) {
        comfirmedOutput = (
            <Card style={styles.summaryContainer}>
                <BodyText>You selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)}  color={Colors.primary}/>
            </Card>
        )        
    }

   //TouchableWithoutFeedback> faz o teclado desaparecer ao clicaar na parte branca da tela
    return (
         <TouchableWithoutFeedback 
            onPress={() => {
                Keyboard.dismiss()
            }}
         > 
            <View style={styles.screen}>
                <TitleText style={styles.title}>Start a New Game!</TitleText>
                <Card style={styles.inputContainer}>
                    <View style={styles.inputContainer}>
                        <BodyText>Select a Number</BodyText>
                        <Input 
                            style={styles.input}
                            blurOnSubmit
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="number-pad"
                            maxLength={2}
                            onChangeText={numberInputHandler}
                            value={enteredValue}
                        />
                        <View style={styles.buttonContainer}>
                            <View style={styles.button}>
                                <Button title="Reset" onPress={resetInputHandler} color={Colors.accent} />
                            </View>
                            <View style={styles.button}>
                                <Button title="Confirm" onPress={comfirmInputHandler} color={Colors.primary} />
                            </View>
                        </View>
                    </View>
                </Card>
                {comfirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'// alinha na horizontal, da direita p/ a esquerda        
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: 300,
        maxWidth: '90%',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 80
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer :{
        marginTop: 20   ,
        alignItems: 'center'
    }
})

export default StartGameScreen