import { View, Text, StyleSheet} from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useState, memo, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCity } from "../reducers/city";
import FontAwesome from 'react-native-vector-icons/FontAwesome'


export const HomeScreen = memo(() => {
    const city = useSelector((state) => state.city.value);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [suggestionsList, setSuggestionsList] = useState(null);
    const dropdownController = useRef(null);

    const getSuggestions = useCallback(async props => {
        if (typeof props !== 'string' || props.length < 3) {
            setSuggestionsList(null)
            return
        }
        setLoading(true)
        const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${props}`)
        const items = await response.json();
        const itemFeature = items.features;
        const suggestions = itemFeature
            .map((data, i) => ({
                id: i,
                title: data.properties.name, 
                context: data.properties.context
            }))
        setSuggestionsList(suggestions)
        setLoading(false)
    }, [])
    const onClearPress = useCallback(() => {
        setSuggestionsList(null)
    }, [])
    const onOpenSuggestionsList = useCallback(isOpened => { }, [])
    const cityContent = city.map((data, id) => {
        return (
            <View style={styles.cityContainer} hey={id}>
                <FontAwesome name="map-marker" style={styles.icon} size={30} />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{data.title}</Text>
                    <Text style={styles.text}>{data.context}</Text>
                </View>
            </View>
        )
    })
    return (
        <>
            <View
                style={[
                    { flex: 1, flexDirection: 'column', alignItems: 'center' },
                    Platform.select({ ios: { zIndex: 1 } }),
                ]}>
                <AutocompleteDropdown
                    controller={controller => {
                        dropdownController.current = controller
                    }}
                    direction={Platform.select({ ios: 'down' })}
                    dataSet={suggestionsList}
                    onChangeText={getSuggestions}
                    onSelectItem={item => {
                        item && dispatch(addCity(item))
                    }}
                    debounce={600}
                    onClear={onClearPress}
                    onOpenSuggestionsList={onOpenSuggestionsList}
                    loading={loading}
                    useFilter={false}
                    textInputProps={{
                        placeholder: 'Search City',
                        autoCorrect: false,
                        autoCapitalize: 'none',
                    }}
                    rightButtonsContainerStyle={{
                        right: 8,
                        height: 30,
                        alignSelf: 'center',
                    }}
                    inputContainerStyle={{
                        width: '80%',
                        height:50,
                        borderColor: '#f94',
                        borderRadius:5,
                        borderWidth: 1,
                        backgroundColor: '#fff',
                        color: '#000',
                    }}
                    suggestionsListContainerStyle={{
                        backgroundColor: '#fff',
                    }}
                    containerStyle={{ flexGrow: 1, flexShrink: 1 }}
                    renderItem={(item, text) => <Text style={{ color: '#000', padding: 15 }}>{item.title}</Text>}
                    inputHeight={50}
                    showChevron={false}
                    closeOnBlur={false}
                />
                {cityContent}
            </View>
        </>
    )
})
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    autocomplete: {
        width: '80%',
        height:50,
        borderColor: '#f94',
        borderRadius:5,
        borderWidth: 1,
        backgroundColor: '#fff',
        color: '#000',
    },
    cityContainer: {
        flexDirection: 'row',
        width: '80%',
        backgroundColor:'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        borderColor: '#f94',
        borderRadius:5,
        borderWidth: 1,
        marginTop: 15
    },
    textContainer: {
        padding: 5
    },
    icon:{
        marginLeft: 10,
        color: '#af5'
    },
    text: {
        textAlign: 'right',
        fontWeight: 400,
    }
})