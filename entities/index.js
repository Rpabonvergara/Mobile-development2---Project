import Matter from "matter-js";
import Box from '../components/Box';
import Coyote from "../components/Coyote";
import Floor from "../components/Floor";
import Images from '../Images';
import RoadRunner from "../components/RoadRunner";
import Constants from "../Constants";

import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


export default restart => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    engine.gravity.y = 0.9;

    return {
        physics: { engine, world },
        Coyote: Coyote(world, { x: 40, y: windowHeight - 110 }, { height: 40, width: 40 }, { isStatic: true }),
        RoadRunner: RoadRunner(world, { x: 150, y: windowHeight - 110 }, { height: 40, width: 100 }, { isStatic: true }),
        Floor: Floor(world, 'b05127', { x: windowWidth / 2, y: windowHeight }, { height: 70, width: windowWidth }),
        Cactus: Box(
            world,
            "",
            { x: windowWidth + 200, y: windowHeight - 20 }, // position of enemy
            { width: 80, height: 80 },
            { isStatic: false, image: Images.Cactus, label: "Cactus" }
        ),
        Obstacule: Box(
            world,
            "",
            { x: windowWidth + 100, y: windowHeight - 150 }, // position of enemy
            { width: 80, height: 80 },
            { isStatic: false, image: Images.Obstacule, label: "Obstacule" }
        ),
        Camel: Box(
            world,
            "",
            { x: windowWidth + 100, y: windowHeight - 150 }, // position of enemy
            { width: 80, height: 80 },
            { isStatic: false, image: Images.Camel, label: "Camel" }
        ),
        Lizard: Box(
            world,
            "",
            { x: windowWidth + 100, y: windowHeight - 150 }, // position of enemy
            { width: 100, height: 100 },
            { isStatic: false, image: Images.Lizard, label: "Lizard" }
        ),
        Meerkat: Box(
            world,
            "",
            { x: windowWidth + 100, y: windowHeight - 150 }, // position of enemy
            { width: 80, height: 80 },
            { isStatic: false, image: Images.Meerkat, label: "Meerkat" }
        ),
    };
};
