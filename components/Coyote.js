import Matter from 'matter-js';
import React from 'react';
import { View, Image,Text } from 'react-native';


const Coyote = (props) => {
  const xBody = props.body.position.x - 70 / 2;   //init x postion of a ball before the game starts
  const yBody = props.body.position.y - 150 / 2;  //init y postion of a ball before the game starts

  //const color = props.color;

  return (
    <View
      style={{
        //borderWidth: 1,
       //borderColor: 'black',
        //backgroundColor: color,
        //position: 'absolute',
        left: xBody,
        top: yBody,
       // borderRadius: 44 / 2,
       width: 4,
       height: 4,
        //backgroundSize: 'auto',
       

      }}>
      
      <Image
          style={{
            resizeMode: 'cover',
            height: 130,
            width: 130
            ,
          }}
          source={require('../assets/coyote.gif')}
        />
      
      </View>
  );
};

export default (world, pos = { x: 0, y: 0 }, size) => {
  const coyote = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: 'coyote',
    },
  );
  Matter.World.add(world, coyote);

  return {
    body: coyote,
    pos,
    renderer: <Coyote />,
  };
};
