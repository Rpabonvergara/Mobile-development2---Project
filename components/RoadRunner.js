import Matter from 'matter-js';
import React from 'react';
import { View, Image, Text } from 'react-native';

const RoadRunner = (props) => {
  const xBody = props.body.position.x - 150 / 2;
  const yBody = props.body.position.y - 70 / 2;

  return (
    <View
      style={{
        left: xBody,
        top: yBody,
        width: 4,
        height: 4,
      }}>
      <Image
        style={{
          resizeMode: 'cover',
          height: 85,
          width: 270,
        }}
        source={require('../assets/RoadRunner.gif')}
      />
    </View>
  );
};

export default (world, pos = { x: 0, y: 0 }, size) => {
  const road_runner = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: 'road_runner',
    },
  );
  Matter.World.add(world, road_runner);

  return {
    body: road_runner,
    pos,
    renderer: <RoadRunner />,
  };
};
