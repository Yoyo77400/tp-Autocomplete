import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
  KeyboardAvoidingView,
  ImageBackground
} from 'react-native';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import city from './reducers/city';
import { HomeScreen } from './screens/HomeScreen';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { Colors } from 'react-native/Libraries/NewAppScreen'

const store = configureStore({
  reducer: { city }
})

export default function App() {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  }
  return (

    <Provider store={store}>
      <ImageBackground source={require('./assets/background.png')} resizeMode="cover" style={{flex:1}}>
        <AutocompleteDropdownContextProvider>
          <SafeAreaView style={(backgroundStyle, { flex: 1 })}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              enabled>
              <ScrollView
                nestedScrollEnabled
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="handled"
                contentInsetAdjustmentBehavior="automatic"
                contentContainerStyle={{ paddingBottom: 0 }}
                style={styles.scrollContainer}>
                <View style={styles.container}>
                  <Text style={styles.title}>Where we going ?</Text>
                  <View style={styles.section}>
                    <HomeScreen />
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </AutocompleteDropdownContextProvider>
        </ImageBackground>
    </Provider>

  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1
  },
  container: {
    padding: 20
  },
  title: {
    textAlign: 'center',
    fontSize: 60,
    marginBottom: 50,
    color: '#f94',
    fontWeight: 600,
  },
  section: {
    marginBottom: 40
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 3
  }
})