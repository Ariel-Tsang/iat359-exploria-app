import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, Platform } from 'react-native';

const CountryFilter = ({ setSelectedValue }) => { // Accept setSelectedValue as a prop
    const [tempValue, setTempValue] = useState(null);

    const options = [
        { label: 'Argentina', value: 'ar' },
        { label: 'Austria', value: 'at' },
        { label: 'Australia', value: 'au' },
        { label: 'Belgium', value: 'be' },
        { label: 'Bulgaria', value: 'bg' },
        { label: 'Brazil', value: 'br' },
        { label: 'Canada', value: 'ca' },
        { label: 'Switzerland', value: 'ch' },
        { label: 'China', value: 'cn' },
        { label: 'Colombia', value: 'co' },
        { label: 'Cuba', value: 'cu' },
        { label: 'Germany', value: 'de' },
        { label: 'Egypt', value: 'eg' },
        { label: 'France', value: 'fr' },
        { label: 'United Kingdom', value: 'gb' },
        { label: 'Greece', value: 'gr' },
        { label: 'Hong Kong', value: 'hk' },
        { label: 'Hungary', value: 'hu' },
        { label: 'Indonesia', value: 'id' },
        { label: 'Ireland', value: 'ie' },
        { label: 'Israel', value: 'il' },
        { label: 'India', value: 'in' },
        { label: 'Italy', value: 'it' },
        { label: 'Japan', value: 'jp' },
        { label: 'South Korea', value: 'kr' },
        { label: 'Morocco', value: 'ma' },
        { label: 'Mexico', value: 'mx' },
        { label: 'Malaysia', value: 'my' },
        { label: 'Netherlands', value: 'nl' },
        { label: 'Norway', value: 'no' },
        { label: 'New Zealand', value: 'nz' },
        { label: 'Philippines', value: 'ph' },
        { label: 'Poland', value: 'pl' },
        { label: 'Portugal', value: 'pt' },
        { label: 'Romania', value: 'ro' },
        { label: 'Serbia', value: 'rs' },
        { label: 'Russia', value: 'ru' },
        { label: 'Saudi Arabia', value: 'sa' },
        { label: 'Sweden', value: 'se' },
        { label: 'Singapore', value: 'sg' },
        { label: 'Slovenia', value: 'si' },
        { label: 'Thailand', value: 'th' },
        { label: 'Turkey', value: 'tr' },
        { label: 'Taiwan', value: 'tw' },
        { label: 'Ukraine', value: 'ua' },
        { label: 'United States', value: 'us' },
        { label: 'Venezuela', value: 've' },
        { label: 'South Africa', value: 'za' },
    ];

    const handleValueChange = (value) => {
        setTempValue(value);

        // Update selectedValue immediately for Android
        if (Platform.OS === 'android') {
            setSelectedValue(value);
        }
    };

    return (
        <View>
        <Text>Country:</Text>
        <RNPickerSelect
            placeholder={{ label: "Select a country", value: null }}
            items={options}
            onValueChange={handleValueChange} // Update tempValue and selectedValue immediately
            onDonePress={Platform.OS === 'ios' ? () => setSelectedValue(tempValue) : undefined} // iOS only
        />
        </View>
    );
};

export default CountryFilter;

// Reference:
// https://medium.com/@abdurrehman1/how-to-make-a-dropdown-in-react-native-21271e6f923b