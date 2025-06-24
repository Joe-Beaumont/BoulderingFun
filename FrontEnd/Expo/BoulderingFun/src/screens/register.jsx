import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


// Validation
const schema = yup.object().shape({
    name: yup.string()
    .required('Name is required'),
    email: yup.string()
    .email('Invalid email')
    .required('Email is required'),
    password: yup
    .string().min(6, 'Password must be at least 6 characters)')
    .required('Password is required'),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password is required'),
});

export default function Register(){
    const navigation = useNavigation();

    const {control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        //Populate database with userinfo goes here - PLACEHOLDER
        navigation.navigate('Home');
    };

    return (
        <View>
            <Text>Register</Text>

                {/* Name */}
                <Text>Name</Text>
                <Controller
                control={control}
                name="name"
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                    placeholder="Enter name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    />
                )}
                />
                {errors.name && <Text>{errors.name.message}</Text>}

                {/* Email */}
                <Text>Email</Text>
                <Controller
                control={control}
                name="email"
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
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
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                    placeholder="Enter password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    />
                )}
                />
                {errors.password && <Text>{errors.password.message}</Text>}

                {/* Confirm Password */}
                <Text>Confirm Password</Text>
                <Controller
                control={control}
                name="confirmPassword"
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                    placeholder="Confirm Password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    />
                )}
                />
                {errors.confirmPassword && <Text>{errors.confirmPassword.message}</Text>}

                <Button title="Register" onPress={handleSubmit(onSubmit)} />
        </View>
    )
}