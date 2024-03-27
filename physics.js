import Matter from "matter-js";
import { Dimensions } from 'react-native';
import Images from './Images';


const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width


const Physics = (entities, { touches, time, dispatch }) => {
    let engine = entities.physics.engine;

    /*************Moving the Coyote wiht mosue Click/Touch  ****************/
    /*
    let x = entities.Coyote.body.position.x;
    let y = entities.Coyote.body.position.y;
    touches.filter((t) => t.type === "move")
        .forEach((t) => {
            x += t.delta.pageX - 0.2;
            y += t.delta.pageY - 0.2;
            Matter.Body.setPosition(entities.Coyote.body, {
                x: x,
                y: y,
            });
        });
    */
    /*************TOUCHING / Clikcing the  Coyote ****************/
    let canJump = true; // Flag to control if the coyote can jump

    touches.filter(t => t.type === 'press').forEach(t => {
        if (canJump) {
            Matter.Body.applyForce(entities.Coyote.body, entities.Coyote.body.position, { x: 0, y: -0.05 });
            canJump = false; // Prevent further jumping
            setTimeout(() => {
                canJump = true; // Allow jumping again after a delay
            }, 200); // Adjust the delay as needed
        }
    });
    /*************Create enemies randomly from the floor every two seconds  ****************/

    if (time.current % 2000 < 10) {
        console.log("Generating Enemy");
        // Randomly select an enemy type to spawn
        const enemyTypes = ['Cactus', 'Obstacule', 'Camel', 'Lizard', 'Meerkat'];
        const randomEnemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];

        let xRoadRunner = 170;
        let yRoadRunner = entities.RoadRunner.body.position.y;
        console.log(xRoadRunner);
        Matter.Body.setPosition(entities.RoadRunner.body, {
            x: xRoadRunner,
            y: yRoadRunner,
        });
        Matter.Body.setVelocity(entities.RoadRunner.body, {
            x: 0,
            y: -15
        });

        // Define enemy position
        let x = windowWidth - 20; // Initialize outside the screen on the right side
        let y = windowHeight - 30; // Random vertical position

        // Create the enemy entity based on the selected type
        const enemyEntity = entities[randomEnemyType];
        Matter.Body.setPosition(enemyEntity.body, { x, y });

        // Set velocity to move the enemy towards the Coyote
        Matter.Body.setVelocity(enemyEntity.body, {
            x: -4.5, // Negative velocity to move left
            y: 0,
        });
    }
    // Collision detection
    Matter.Events.on(engine, 'collisionStart', (event) => {
        const pairs = event.pairs;
        pairs.forEach((pair) => {
            if ((pair.bodyA === entities.Coyote.body && pair.bodyB.label === "Cactus") ||
                (pair.bodyA.label === "Cactus" && pair.bodyB === entities.Coyote.body) ||
                (pair.bodyA === entities.Coyote.body && pair.bodyB.label === "Camel") ||
                (pair.bodyA.label === "Camel" && pair.bodyB === entities.Coyote.body) ||
                (pair.bodyA === entities.Coyote.body && pair.bodyB.label === "Lizard") ||
                (pair.bodyA.label === "Lizard" && pair.bodyB === entities.Coyote.body) ||
                (pair.bodyA === entities.Coyote.body && pair.bodyB.label === "Meerkat") ||
                (pair.bodyA.label === "Meerkat" && pair.bodyB === entities.Coyote.body) ||
                (pair.bodyA === entities.Coyote.body && pair.bodyB.label === "Obstacule") ||
                (pair.bodyA.label === "Obstacule" && pair.bodyB === entities.Coyote.body)) {
                dispatch({ type: 'game_over' });
            }
        });
    });
    for (let enemyType of ['Cactus', 'Camel', 'Lizard', 'Meerkat', 'Obstacule']) {
        const enemy = entities[enemyType];
        if (enemy.body.position.x < 0 && !enemy.scored) {
            dispatch({ type: "score" });
            enemy.scored = true; // Marcando o inimigo como pontuado para evitar pontuação duplicada
        }
    }

    // Atualiza a flag 'scored' dos inimigos que estão à esquerda da tela
    for (let enemyType of ['Cactus', 'Camel', 'Lizard', 'Meerkat', 'Obstacule']) {
        const enemy = entities[enemyType];
        if (enemy.body.position.x < 0) {
            enemy.scored = true;
        }
    }
    // Movimenta o RoadRunner e garante que ele não ultrapasse os limites da tela
    /*let xRoadRunner = entities.RoadRunner.body.position.x;
    let yRoadRunner = entities.RoadRunner.body.position.y;
    const roadRunnerWidth = entities.RoadRunner.body.bounds.max.x - entities.RoadRunner.body.bounds.min.x;
    const roadRunnerHeight = entities.RoadRunner.body.bounds.max.y - entities.RoadRunner.body.bounds.min.y;

    // Limita o movimento do RoadRunner para a direita da tela
    if (xRoadRunner + roadRunnerWidth > windowWidth) {
        xRoadRunner = windowWidth - roadRunnerWidth;
    }

    // Limita o movimento do RoadRunner para a esquerda da tela
    if (xRoadRunner < 0) {
        xRoadRunner = 0;
    }

    // Limita o movimento do RoadRunner para a parte inferior da tela
    if (yRoadRunner + roadRunnerHeight > windowHeight) {
        yRoadRunner = windowHeight - roadRunnerHeight;
    }

    // Verifica se o RoadRunner ultrapassou os limites da tela para a direita e o reposiciona
    if (xRoadRunner + roadRunnerWidth > windowWidth) {
        xRoadRunner = initialRoadRunnerX;
    }

    Matter.Body.setPosition(entities.RoadRunner.body, {
        x: xRoadRunner,
        y: yRoadRunner,
    });*/

    Matter.Engine.update(engine, time.delta);

    return entities;
};

export default Physics;