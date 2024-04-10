import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const charadas = [
  {
    pergunta: 'Quanto é 15 + 7?',
    alternativas: ['20', '22', '25'],
    respostaCorreta: '22'
  },
  {
    pergunta: 'Quanto é 40 - 18?',
    alternativas: ['22', '20', '25'],
    respostaCorreta: '22'
  },
  {
    pergunta: 'Quanto é 5 × 4?',
    alternativas: ['15', '20', '25'],
    respostaCorreta: '20'
  },
  {
    pergunta: 'Quanto é 36 ÷ 6?',
    alternativas: ['5', '6', '7'],
    respostaCorreta: '6'
  },
  {
    pergunta: 'Quanto é 8² (8 ao quadrado)?',
    alternativas: ['64', '72', '80'],
    respostaCorreta: '64'
  },
  {
    pergunta: 'Quanto é 25 + 13?',
    alternativas: ['35', '38', '42'],
    respostaCorreta: '38'
  },
  {
    pergunta: 'Quanto é 50 - 24?',
    alternativas: ['26', '28', '32'],
    respostaCorreta: '26'
  },
  {
    pergunta: 'Quanto é 6 × 7?',
    alternativas: ['36', '40', '42'],
    respostaCorreta: '42'
  },
  {
    pergunta: 'Quanto é 45 ÷ 9?',
    alternativas: ['4', '5', '6'],
    respostaCorreta: '5'
  },
  {
    pergunta: 'Quanto é 9² (9 ao quadrado)?',
    alternativas: ['72', '81', '90'],
    respostaCorreta: '81'
  },
  {
    pergunta: 'Quanto é 18 + 25?',
    alternativas: ['40', '43', '47'],
    respostaCorreta: '43'
  },
  {
    pergunta: 'Quanto é 60 - 37?',
    alternativas: ['21', '23', '27'],
    respostaCorreta: '23'
  },
  {
    pergunta: 'Quanto é 8 × 6?',
    alternativas: ['42', '46', '48'],
    respostaCorreta: '48'
  },
  {
    pergunta: 'Quanto é 72 ÷ 9?',
    alternativas: ['6', '7', '8'],
    respostaCorreta: '8'
  },
  {
    pergunta: 'Quanto é 7³ (7 ao cubo)?',
    alternativas: ['343', '364', '392'],
    respostaCorreta: '343'
  }
];

const App = () => {

  const navigation = useNavigation();

  const [round, setRound] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [respostaCorreta, setRespostaCorreta] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [mensagemModal, setMensagemModal] = useState('');
  const [charadasSelecionadas, setCharadasSelecionadas] = useState([]);

  useEffect(() => {
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const selecionarCharadasAleatorias = () => {
      const charadasShuffled = shuffleArray([...charadas]);
      const charadasSelecionadas = charadasShuffled.slice(0, 5);
      setCharadasSelecionadas(charadasSelecionadas);
    };

    selecionarCharadasAleatorias();
  }, []);

  const responder = (resposta) => {
    if (resposta === charadasSelecionadas[round].respostaCorreta) {
      setAcertos(acertos + 1);
      setRespostaCorreta(true);
      setMensagemModal('Você acertou! Ir para a próxima charada.');
    } else {
      setErros(erros + 1);
      setRespostaCorreta(false);
      setMensagemModal('Não foi dessa vez! Ir para a próxima charada.');
    }
    setRespostaSelecionada(resposta);
    setModalVisible(true);
  };

  const proximaCharada = () => {
    if (round < charadasSelecionadas.length - 1) {
      setRound(round + 1);
    } else {
      Alert.alert(
        'VitaMental',
        `Fim do jogo!\nAcertos: ${acertos}\nErros: ${erros}`,
        [
          {
            text: 'OK',
            onPress: () => {
              setRound(0);
              setAcertos(0);
              setErros(0);
              setCharadasSelecionadas([]);
              setModalVisible(false);

              const shuffleArray = (array) => {
                for (let i = array.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
              };

              const selecionarCharadasAleatorias = () => {
                const charadasShuffled = shuffleArray([...charadas]);
                const charadasSelecionadas = charadasShuffled.slice(0, 5);
                setCharadasSelecionadas(charadasSelecionadas);
              };

              selecionarCharadasAleatorias();
            }
          }
        ]
      );
    }
    setRespostaSelecionada(null);
    setRespostaCorreta(null);
    setModalVisible(false);
  };

  return (

    <View style={styles.header}>
      <View style={styles.container}>
        <Text style={styles.jogos}>
          Matemática
          <View style={styles.iconeHome}>
            <Ionicons name="home-outline"
              style={styles.iconeInicio}
            onPress={toHome} 
            />
          </View>
        </Text>
        <Text style={styles.resumoJogos}>
          Uma atividade que envolve perguntas rápidas e diretas sobre matemática para testar o conhecimento do jogador.
        </Text>
      </View>

      <View style={styles.central}>
        <Text style={styles.pergunta}>
          {charadasSelecionadas.length > 0
            ? charadasSelecionadas[round].pergunta
            : "Carregando..."}
        </Text>
        {charadasSelecionadas.length > 0 &&
          charadasSelecionadas[round].alternativas.map((alternativa, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.botao,
                {
                  backgroundColor:
                    respostaSelecionada === alternativa
                      ? respostaCorreta
                        ? '#719257'
                        : '#E1374C'
                      : '#fff',
                },
              ]}
              onPress={() => responder(alternativa)}
              disabled={respostaSelecionada !== null}
            >
              <Text style={styles.textoBotao}>{alternativa}</Text>
            </TouchableOpacity>
          ))}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{mensagemModal}</Text>
            <TouchableOpacity
              style={[styles.botaoOk, { backgroundColor: '#3C4146' }]}
              onPress={proximaCharada}
            >
              <Text style={styles.textoBotaoOk}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 200,
    // flex: 0.7,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingHorizontal: 20,
  },
  jogos: {
    marginTop: 50,
    marginLeft: 15,
    fontSize: 23,
    fontWeight: '800',
    color: '#34393E'
  },
  iconeHome: {
    fontSize: 27,
    // marginLeft: 155,
    marginLeft: 160,
    color: "#34393E"
  },
  iconeInicio: {
    fontSize: 24,
    marginTop: 5,
    // marginLeft: 155,
    marginLeft: 160,
    color: "#34393E"
  },
  resumoJogos: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 16,
    fontWeight: '500',
    color: '#34393E'
  },
  central: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    backgroundColor: '#3C4146'
  },
  header: {
    justifyContent: 'center',
    display: 'flex',
    flex: 1,
    backgroundColor: '#3C4146'
  },
  pergunta: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 22,
    textAlign: 'center',
    width: 330,
    alignItems: 'center',
  },
  botao: {
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 290,
    height: 52,
    borderRadius: 25,
    textAlign: 'center',
    alignContent: 'center',
    border: '1px solid #d3d3d3'
  },
  botaoOk: {
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 16,
    marginLeft: 25,
    marginRight: 25,
  },
  textoBotao: {
    color: '#000',
    fontSize: 15
  },
  textoBotaoOk: {
    color: '#fff',
    fontSize: 15
  },
  modalView: {
    backgroundColor: '#DADADA',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
      border: '1px solid #d3d3d3'
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: '#3C4146',
    fontWeight: '500',
    marginTop: 17,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 17
  },
});

export default App;