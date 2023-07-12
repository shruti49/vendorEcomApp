import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

const CustomButton = props => {
  const {handlePress, title, width} = props;

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`${width} p-4 content-center items-center self-center mt-8 bg-primary rounded-xl`}>
      <Text className="text-xl text-white">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
