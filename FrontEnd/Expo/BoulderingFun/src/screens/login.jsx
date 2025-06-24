import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation
const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6).required('Password is required'),
});

export default function Login() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const navigation = useNavigation();

    const onSubmit = (data) => {
        navigation.navigate('Home')
    }

    const onRegister = () => {
        navigation.navigate('Register')
    }

    return (
        <View>
            <Text>Login</Text>
            {/* Email */}
            <Text>Email</Text>
            <Controller
            control={control}
            name="email"
            defaultValue=""
            render={({ field: {onChange, onBlur, value} }) => (
                <TextInput
                placeholder="Enter email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                />
            )}
            />
            {errors.email && <Text>{errors.email.message}</Text>}

                        {/* Password */}
                        <Text>Password</Text>
            <Controller
            control={control}
            name="password"
            defaultValue=""
            render={({ field: {onChange, onBlur, value} }) => (
                <TextInput
                placeholder="Enter password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                />
            )}
            />
            {errors.password && <Text>{errors.password.message}</Text>}

            {/* Submission Button */}
            <Button title="Login" onPress={handleSubmit(onSubmit)} />
            {/* Registration Button */}
            <Button title="Register" onPress={onRegister} />
        </View>
    )
}