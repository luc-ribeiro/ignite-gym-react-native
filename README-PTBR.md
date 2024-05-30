<div align="center">
  <img height="60" src="./src/assets/logo.svg"  />
</div>

<div align="right">
  Click <a href="https://github.com/luc-ribeiro/ignite-gym-react-native/blob/main/README.md">here</a> to view the english version.
</div>

## 📄 Projeto
Aplicação de gerenciamento de treinos na academia, possuindo uma variedade de exercícios divididos em categorias para facilitar a seleção e o acesso. 
Após a escolha de um exercício, o usuário recebe uma recomendação de quantas séries realizar. 
Também é possível marcar os exercícios como realizados, armazenando-os em um histórico.

A aplicação inclui um sistema de cadastro de usuários com autenticação baseada em tokens, permitindo o gerenciamento de senha e avatar. 
Todo o funcionamento da aplicação é suportado pelo Async Storage, garantindo que os dados inseridos pelo usuário permaneçam salvos mesmo após o fechamento da aplicação.

## 📝 Conceitos

- **Tokens e Refresh Tokens**
- **Rotas públicas e privadas**
- **Estilização com NativeWind**
- **Criação de formulários controlados com React Hook Form**
- **Validação de formulários com Zod**
- **Stack Navigation**
- **Tab Navigation**
- **AsyncStorage**
- **ContextAPI para criação de um AuthContext**
- **Consumo de Back-end com Axios**
- **Manipulação de Axios Interceptors**
- **Utilização do Expo Image Picker para acessar galeria do dispositivo e alterar o avatar do usuário**
- **Autenticação JWT**

## 💻 Tecnologias

- **React Native**
- **TypeScript**
- **NativeWind**
- **AsyncStorage**
- **React Hook Form**
- **Axios**
- **Zod**
- **Expo Image Picker**
- **Expo File System**
- **React Native Toast Message**

## 🔖 Layout
### [Ignite Gym - Figma](https://www.figma.com/file/op1o9A7xHpITbmVvnTTDVu/Ignite-Gym?type=design&node-id=47-273&mode=design)

## 🚀 Executando o projeto

Para utilizar a API do projeto, é necessário clonar a API no repositório abaixo.
```
$ git clone https://github.com/orodrigogo/ignitegym-api.git

// Execute o comando no diretório da API:
$ npm start

// A API será executada na porta 3333
```

```bash
1. Clone este repositório em sua máquina
$ git clone https://github.com/luc-ribeiro/ignite-gym-react-native.git

2. Instale as dependências
$ npm i

3. Crie um arquivo .env seguindo a estrutura do .env.example

4. Rode o projeto através do comando:
$ npm start

- Com o Expo Go aberto em seu dispositivo, escaneie o QR code no terminal
OBS: É preciso ter o Expo Go instalado em seu dispositivo móvel
