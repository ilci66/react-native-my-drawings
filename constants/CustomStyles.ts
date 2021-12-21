import { StyleSheet } from "react-native"

export default StyleSheet.create({
  btnLight: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  btnDark: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
  },
  btnTextLight:{
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  btnTextDark:{
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
} )



// {
//   buttonLight: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 4,
//     elevation: 3,
//     backgroundColor: 'black',
//   },
//   buttonDark: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 4,
//     elevation: 3,
//     backgroundColor: 'white',
//   },
  // No need to use these as the default text is altered to fit the themes already
  // btnTextDark: {
  //   text: {
  //     fontSize: 16,
  //     lineHeight: 21,
  //     fontWeight: 'bold',
  //     letterSpacing: 0.25,
  //     color: 'black',
  //   },
  // },
  // btnTextLight: {
  //   text: {
  //     fontSize: 16,
  //     lineHeight: 21,
  //     fontWeight: 'bold',
  //     letterSpacing: 0.25,
  //     color: 'white',
  //   },
  // }
// }