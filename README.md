# Cómo empezar a usar el código directamente
Para comenzar primero clona el proyecto
```sh
git clone https://github.com/adsaro/ExpressApiTemplate [nombre-opcional]
```
La parte opcional es por si deseas darle un nombre diferente.

Ingresa al directorio recien creado
```sh
cd ExpressApiTemplate #o el nombre que le hayas dado
```

Instala las dependencias
```sh
npm install
```

Copia el archivo .env.example en .env
```sh
cp .env.example .env
```
Y modifica el contenido para que la URL de la base de datos sea la correcta para tu aplicación.

# Tutorial completo

# Crear plantilla de proyecto en Node.js con Express, PostgreSQL y Jest para TDD

Para comenzar con este tutorial será necesario tener instalados git, node.js, npm y yarn. Si aún no los has instalado visitas sus páginas web y sigue las instrucciones para su instalación.
## Instalando express-generator y creando el proyecto
El primer paso es instalar express-generator, ejecuta
```sh
npm install -g express-generator
```
en la terminal. No te preocupes, si ya lo tenías instalado simplemente se actualizará a la última versión lo cual es siempre recomendable.
Una vez instalado express-generator dirígete en la terminal hasta el directorio en el cual deseas crear tu nuevo proyecto y una vez dentro ejecuta 
```sh
express <nombre-del-proyecto>
```
para crear el proyecto, sustituye <nombre-del-proyecto> por el nombre que desees darle.
Una vez creado el proyecto deberás ver una pantalla parecida a la siguiente
imagen1
y deberás dirigirte a ese nuevo directorio que se ha creado
```sh
cd <nombre-del-proyecto>
```
e instalar las dependencias del proyecto con
```sh
yarn
````
lo cual instalará todas las dependencias para que puedas ejecutar tu proyecto y verlo en el navegador.
Para comprobar que tu proyecto funciona bien ejecuta en la terminal el comando
```sh
yarn start
````
el cual ejecutará tu proyecto y podrás ver el resultado yendo al navegador y visitando la dirección http://localhost:3000, en la cual deberás ver una página como esta
imagen2
¡Felicidades! Ahora tienes tu proyecto ejecutándose, aunque aún no tiene mucha funcionalidad pero pronto arreglaremos eso.
Lo que tenemos hasta el momento es una base que podremos utilizar para diferentes tipos de proyectos pero hoy nos enfocaremos en crear una API, es decir, un sitio encargado de responder a peticiones de aplicaciones pero sin una interfaz visual sino que utilizará la interfaz visual de la propia aplicación que realice la petición.
## Limpiando el proyecto
Como no vamos a utilizar la parte visual del proyecto vamos a borrar los directorios view/ y public/ dentro de nuestro proyecto así como el archivo routes/users.js y vamos a eliminar la dependencia de jade la cual es utilizada para producir dicha parte visual, la eliminaremos ejecutando en la terminal
```sh
yarn remove jade
````
De momento nuestra aplicación no funcionará porque aún nos falta limpiar el código que depende de los archivos que hemos eliminado pero como vamos a utilizar ES6 en nuestro proyecto y el código actual está en ES5 nos conviene esperar hasta convertir nuestro código a ES6 para poder limpiarlo en el mismo paso.
Para los pasos siguientes yo suelo utilizar Visual Studio Code como editor para facilitar muchos de los pasos pero siéntete libre de usar el editor que mejor conozcas.
Abre el proyecto en tu editor y crea el archivo .gitignore dentro del directorio raíz y pega el siguiente contenido
````
node_modules/
yarn-error.log
yarn.lock
.env
coverage
build/
````
este archivo nos permite ignorar archivos y directorios una vez empecemos a utilizar git para llevar un control de nuestro proyecto e ir guardando los cambios que le hagamos al mismo.
## Convirtiendo el código a ES6
Crea un directorio src/ dentro del directorio raíz y mueve dentro de este los directorios bin/ y routes/ así como el archivo app.js
Cambiar el nombre al archivo src/bin/www por src/bin/www.js.
Reemplaza el código de src/routes/index.js por
```javascript
import express from 'express';

const indexRouter = express.Router();

indexRouter.get('/', (req, res) =>
  res.status(200).json({ message: 'Bienvenido al template de Express' })
);

export default indexRouter;
````
este código está ya en formato ES6 y nos permitirá ver el mensaje Bienvendio al template de express en el navegador una vez que hayamos convertido todo el código en nuestra aplicación.
Reemplaza el código de src/app.js por

```javascript
import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index';

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', indexRouter);
	
export default app;
````
Como ves este código también está convertido a formato ES6 y ya no contiene ninguna referencia a los archivos de la parte visual.
Finalmente convertiremos el código de src/bin/www.js reemplazándolo por el siguiente
```javascript
//#!/usr/bin/env node
/**
 * Module dependencies.
 */
import debug from 'debug';
import http from 'http';
import app from '../app';
/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
  case 'EACCES':
    alert(`${bind} requires elevated privileges`);
    process.exit(1);
    break;
  case 'EADDRINUSE':
    alert(`${bind} is already in use`);
    process.exit(1);
    break;
  default:
    throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
};
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
````
¡Listo! Ya hemos convertido nuestro código a formato ES6; sin embargo aún no funciona ya que necesitamos una herramienta que nos permita traducir este código al formato que node.js entiende, el cual es ES5.
¿Y entonces por qué lo convtimos de ES5 a ES6 si lo vamos a convertir nuevamente a ES5? La respuesta es que ES6 nos permite trabajar más cómodamente con elementos nuevos en el lenguaje como pueden ser los Promises y la sintaxis async/await.
### Instalando babel y el resto de librerías necesarias
Para lograr esta traducción a ES5 es necesario instalar unas librerías las cuales nos ayudarán con esta tarea. Para ello ejecutaremos en la terminal el comando
```sh
yarn add @babel/cli @babel/core @babel/plugin-transform-runtime @babel/preset-env @babel/register @babel/runtime @babel/node --dev
````
las funciones de cada una de estas librerías se especifican en la siguiente tabla
|Librería|Función|
|--|--|
|@babel/cli|Es necesaria para ejecutar los comandos que hacen la traducción del código.|
|@babel/core |Funcionalidad central de babel.|
|@babel/node |Funciona igual que node.js pero con el beneficio de usar babel antes de correr nuestro proyecto|
|@babel/plugin-transform-runtime|Ayuda a evitar duplicación en el código traducido.|
|@babel/preset-env|Una colección de plugins responsables de la traducción del código.|
|@babel/register|Traduce los archivos al vuelo y se requiere para poder realizar los tests.|
|@babel/runtime|Trabaja en conjunto con @babel/plugin-transform-runtime.|

Una vez instaladas las librerías, crea el archivo .babelrc dentro del directorio raíz del proyecto e incluye el siguiente contenido
```json
{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/transform-runtime"]
}
````
este archivo ayudará a babel a realizar la traducción correctamente.
### Instalando nodemon para automatizar la ejecución de la aplicación
Instala la librería nodemon dentro del proyecto con el siguiente comando
```sh
yarn add nodemon --dev
````
y crea un archivo en la raíz del proyecto llamado nodemon.json con el siguiente contenido
```json
{
  "watch": [
    "package.json",
    "nodemon.json",
    ".eslintrc.json",
    ".babelrc",
    ".prettierrc",
    ".env",
    "src/"
  ],
  "verbose": true,
  "ignore": ["*.test.js", "*.spec.js"]
}
````
nodemon nos servirá para estar vigilando nuestro código y cada que hagamos un cambio y guardemos automáticamente relanzará nuestra aplicación para que podamos ver los cambios sin tener que detener y relanzar manualmente. El archivo nodemon.json es usado por nodemon para saber sobre qué archivos de nuestro código vigilar y cuales ignorar.
Ya que tenemos todo listo podemos actualizar los scripts para lanzar nuestra aplicación nuevamente pero ya con todos los cambios en el código funcionando con ES6.
Actualizamos los scripts en el archivo package.json incluyendo para que se vean así
```json
"scripts": {
    "prestart": "babel ./src --out-dir build",
    "start": "node ./build/bin/www",
    "startdev": "nodemon --exec babel-node ./src/bin/www"
}
````
- El script prestart realiza la traducción de nuestro código. Si se utiliza yarn start el script prestart se ejecutará automáticamente antes del script start
- El script start lanza la aplicación desde el directorio build/ en lugar de src/. El directorio build/ es creado por babel y tiene el código ya traducido, es por eso que se lanza desde ese directorio y no desde src/ que es donde tenemos nuestro código sin traducir
- El script startdev será usado para lanzar nuestra aplicación mientras estemos en desarrollo. Nota cómo hemos usado babel-node para lanzar la aplicación en lugar de node ya que lo que este comando está haciendo es lanzar la aplicación desde el directorio src/ que es donde estamos trabajando y no está traducido, por lo cual node no podría entenderlo.

Ejecuta el comando
```sh
yarn startdev
```
y visita la página http://localhost:3000 
## Inicializando Git
Ahora que ya tenemos nuestra aplicación funcionando con el formato ES6 es un buen momento para guardarla con git.
Inicializamos git en nuestro proyecto con el comando
```sh
git init
```
y podemos ver el estado actual del seguimiento con el comando
```sh
git status
```
veremos una lista de archivos y directorios marcados en rojo, lo cual nos indica que git está activo pero que aún no ha empezado a rastrear nada.
Para empezar a rastrear lo primero que haremos es decirle que agregue todos los archivos de nuestro proyecto a su rastreo utilizando el comando
```sh
git add .
```
nota cómo el punto del final es importante ya que es el que le dice a git que queremos agregar todo el directorio de nuestro proyecto. Y gracias a nuestro archivo .gitignore que creamos antes git sólo agregará los archivos en los que estamos trabajando e ignorará todos a los que no nos interesa darles seguimiento, tal es el caso del directorio node_modules el cual está lleno de código de las librerías que aunque es importante para que nuestro proyecto funcione no es necesario darles seguimiento ya que con sólo ejecutar el comando
```sh
yarn
```
este directorio será creado automáticamente con exactamente el mismo contenido.
Si ejecutamos nuevamente el comando
```sh
git status
```
deberemos ver nuevamente una lista de archivos pero esta vez marcados en verde. Esto nos indica que git ya los tiene listos para ser guardados en su registro pero que aún no se han guardado. Para guardarlos necesitamos hacer un commit con el siguiente comando
```sh
git commit -m "Proyecto funcionando con ES6"
```
el mensaje entre comillas puede ser personalizado a gusto de cada uno, yo he decidido usar “Proyecto funcionando con ES6” pero no es necesario que se use el mismo, este es sólo un mensaje que será utilizado en un futuro para saber en qué punto se encontraba el proyecto al momento de guardarlo en el registro de git.
## Instalando Eslint y Prettier
Eslint es una herramienta que nos permite mantener nuestro código más limpio señalándonos problemas de formato y permitiéndonos evitar malos hábitos de programación. Por otro lado prettier es una herramienta que nos permite limpiar el código automáticamente ajustándose a un estándar que nosotros definimos, en esencia modifica el código para que siempre cumpla con ese estándar.
Para instalar estas herramientas ejecutamos el siguiente comando en la terminal
```sh
yarn add eslint eslint-config-airbnb-base eslint-plugin-import prettier --dev
```
luego creamos el archivo .eslintrc.json con el siguiente contenido
```json
{
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "jest": true
  },
  "extends": ["airbnb-base"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "indent": ["warn", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "no-console": 1,
    "comma-dangle": [0],
    "arrow-parens": [0],
    "object-curly-spacing": ["warn", "always"],
    "array-bracket-spacing": ["warn", "always"],
    "import/prefer-default-export": [0]
  }
}
```
este archivo configura a eslint para avisarnos si nuestro código se sale de los estándares definidos en este archivo de configuración.
También debemos crear el archivo .prettierrc con el siguiente contenido
```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```
el cual hará lo propio con prettier.
Para poder ejecutar las acciones de estas herramientas debemos agregar los siguientes scripts a nuestro archivo package.json
```json
"lint": "./node_modules/.bin/eslint ./src",
"pretty": "prettier --write **/*.{js,json} !node_modules/**",
"postpretty": "./node_modules/.bin/eslint ./src --fix"
```
el script lint revisará si nuestro código tiene errores de estilo, mietras que el script pretty dará formato a nuestro código para que sea más legible y automáticamente ejecutará el script postpretty el cual ejecutará a lint para que corrija errores. Es decir que pretty hará ambas funciones pero si sólo se desea tener una guía para saber si lo estamos escribiendo bien sin que se modifique nada entonces sólo ejecutamos el script lint.
Para estas alturas ya deber ser evidente la forma de ejecutar estos scripts, simplemente hay que anteponer yarn a cualquiera de ellos y listo. Ejecutemos pues el script de pretty con
```sh
yarn pretty
```
como resultado nuestro código es corregido en caso de que haya algún problema de formato como una línea mal indentada o cosas similares. También notarán que la consola nos notifica sobre dos warnings que encontró
```sh
  45:5  warning  Unexpected alert  no-alert
  49:5  warning  Unexpected alert  no-alert

✖ 2 problems (0 errors, 2 warnings)
```
estos warnings son debidos a que en nuestro archivo src/bin/www.js tenemos un par de alerts y eslint está configurado para avisarnos si tenemos algún alert ya que se considera mala práctica de programación, pero por el momento podemos ignorarlos.
Si quieres jugar con este script intenta cambiar un archivo para que esté mal indentado, amontona líneas y vuélvelo poco legible, luego vuelve a ejecutar el script y mira como prettier corrige tu archivo y lo deja legible nuevamente.
Este es un buen momento para guardar nuestro avance en git, ejecuta los siguientes comando en la terminal
```sh
git add .
git commit -m "eslint y prettier instalados y funcionando correctamente"
```
recuerda que git add . (no olvides el punto) agrega nuestros archivos nuevos o modificados al rastreo de git y git commit –m guarda esos cambios en git, el comentario entre comillas puede ser cualquier mensaje de tu elección siempre y cuando te sirva para recordar el avance que llevamos en el proyecto.
También recuerda que en todo momento puedes revisar el estado en que se encuentra git con el comando
```sh
git status
```
## Definiendo las variables de entorno en el archivo .env
En la mayoría de los proyectos necesitaremos almacenar información que no queremos que sea pública, como es el caso de nombres de usuario, contraseñas o la dirección y credenciales de acceso a nuestra base de datos. Para este tipo de datos utilizaremos el archivo .env, que si recuerdan fue uno de los que incluimos en nuestro .gitignore para que git no le de seguimiento.
De esta manera podremos importar nuestras variables del archivo .env a través de un archivo settings.js en nuestro proyecto y cuando sea necesario compartir nuestro código con alguien más utilizaremos git para subir el código a un repositorio, en el cual el archivo .env con nuestra información sensible no se encontrará y podremos dormir tranquilos sabiendo que nadie husmeará en nuestras bases de datos ni cuentas de correo.
Como primer paso crearemos el archivo .env en la raíz de nuestro proyecto e incluiremos el siguiente código
```javascript
NUESTRA_VARIABLE_DE_ENTORNO="Aquí podremos guardar nuestros datos sensibles"
```
Como se pueden dar cuenta tanto el nombre de la variable como el contenido de la misma son algo arbitrario, pueden usar el nombre que deseen y almacenar la información que necesiten en estas variables de entorno.
Para poder leer la información guardad en estas variables dentro del archivo .env necesitaremos una herramienta más llamada dotenv la cual se puede instalar con el comando
```sh
yarn add dotenv
```
y agregaremos nuestro archivo .env a la lista de archivos vigilados por nodemon en nodemon.json.
Ahora crearemos el archivo settings.js dentro de src/ con el siguiente contenido
```javascript
import dotenv from 'dotenv';

dotenv.config();
export const variableDeEntorno = process.env.NUESTRA_VARIABLE_DE_ENTORNO;
```
y abrimos nuestro archivo src/routes/index.js y sustituimos su contenido por
```javascript
import express from 'express';
import { variableDeEntorno } from '../settings';

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => res.status(200).json({ message: variableDeEntorno }));

export default indexRouter;
```
 guardamos todo y actualizamos nuestra pagina de http://localhost:3000 , deberíamos ver un mensaje con el texto de nuestra variable en .env.
Ahora es un buen momento para limpiar nuestro código y guardarlo en git. Ejecuta
```sh
yarn pretty
```
para realizar la limpieza y después guarda el código en git
```sh
git add .
git commit -m "Establecidas las variables de entorno en el archivo .env"
```
## Escribiendo nuestro primer test
Ahora vamos a incorporar tests en nuestra aplicación. La razón por la que es importante incluir tests en todas nuestras aplicaciones es porque estos nos darán la confianza de extender o modificar nuestro código mientras estamos seguros de que lo que ya funcionaba sigue funcionando sin problemas. La forma de trabajar con Desarrollo Guiado por Pruebas o TDD (Test Driven Development) es primero escribir un test que testeará lo que queremos probar, el cual primero fallará ya que no tenemos aún implementada la funcionalidad que intentamos probar, y luego desarrollamos dicha funcionalidad hasta lograr pasar el test que creamos inicialmente. Cada paso dentro de este proceso debe ser tan pequeño como sea posible para asegurarnos de no escribir test demasiado complejos y pasemos mucho tiempo escribiendo código que no pasa los tests, ni tampoco escribir demasiado código sin test. Esencialmente escribimos un pequeño test para probar el siguiente caso a resolver, nos aseguramos de que ese test sea lo mínimo para que no pase, y luego escribimos el código que hará pasar el test y repetimos el ciclo.
La razón por la cual no habíamos seguido este camino de escribir primero el test y después el código sino que nos hemos dedicado exclusivamente a escribir código sin tests es porque necesitábamos un embalaje en el cual apoyarnos para poder empezar a escribir los tests.
En nuestro primer test probaremos nuestro endpoint y nos aseguraremos de que la respuesta del endpoint es la que esperamos.
### Instalando las librerías y herramientas necesarias para los tests
Instala las herramientas necesarias con
```sh
yarn add jest supertest coveralls --dev
```
jest es la herramienta que nos permitirá ejecutar y analizar los tests, supertest nos permitirá simular el servidor para poder realizar los tests y coveralls nos ayudará a conocer la cobertura de nuestros tests, es decir, cuantas líneas y funciones de nuestro código fueron realmente evaluadas y saber si no hemos dejado código sin testear.
Crea un nuevo directorio test/ dentro del directorio raíz y crea dentro de test/ los archivos index.test.js y setup.js.
Abre el archivo test/setup.js y pega el siguiente código
```javascript
import supertest from 'supertest';
import app from '../src/app';

export const server = supertest.agent(app);
export const BASE_URL = '';
```
este archivo nos ahorrará el tener que importar supertest y app en cada archivo de tests y además nos dará una URL base por si cambiamos la localización de nuestro endpoint.
Ahora abre el archivo index.test.js y pega el siguiente código
```javascript
import { server, BASE_URL } from './setup';

describe('Test de página inicial', () => {
  it('obtener la url base', (done) => {
    server
      .get(`${BASE_URL}/`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual(
          'Aquí podremos guardar nuestros datos sensibles'
        );
        done();
      });
  });
});
```
 este es un archivo básico de test, primero importarmos las variables de nuestro test/setup.js y después iniciamos nuestro test. La función describe() nos ayuda a agrupar varios tests relacionados entre sí, mientras que la función it() es el test que vamos a ejecutar.
Como puedes ver ambas funciones tienen dos argumentos, el primero es un texto que sirve como descripción de lo que estamos intentando probar, mientras que el segundo es una función, que en el caso de it() es la función que probará que nuestro código funcione correctamente.
Agregamos el siguiente script a nuestro archivo package.json
```json
"test": "jest --coverage"
```
y lo ejecutamos con
```sh
yarn test
```
si todo salió bien deberás ver algo como lo siguiente en tu consola

Esto nos indica que todos nuestros test pasaron sin problema y además la tabla nos indica que todos los archivos a los que les hicimos test fueron cubiertos al 100%.
Si deseas ver los resultados de una manera más interactiva puedes abrir el directorio coverage/ que se ha creado automáticamente y dentro de este abrir el directorio lcov-report/ y buscar el archivo index.html, este contiene información detallada sobre la cobertura de los archivos que se probaron.
¡Felicidades! Has pasado tu primer test en la aplicación.
Esto se merece que lo celebremos guardando nuestros cambios en git
```sh
git add . 
git commit -m "Primer test funcionando"
```
## Agregando un controlador
En este momento nuestra aplicación funciona y el código que tenemos en nuestro archivo src/routes/index.js es llamado cada vez que accedemos a http://localhost:3000, hasta aquí ningún problema puesto que nuestro código es muy pequeñito y aunque toda la lógica de nuestra aplicación esté en un solo archivo no nos afecta demasiado. Sin embargo en cuanto nuestra aplicación empiece a crecer, el tener toda la lógica dentro de un mismo archivo noes empezará a perjudicar y nuestro proyecto se volverá cada vez más difícil de mantener. Es por eso que vamos a separar la lógica de nuestra aplicación en diferentes archivos manteniendo las responsabilidades de cada parte del código separadas, haciéndolas mucho más sencillas de mantener o de hacer crecer. Básicamente la S en los principios Solid.
### Creando el directorio y los controladores
Para comenzar crea un directorio controllers/ dentro de src/. Dentro crea los archivos index.js y home.js. El archivo index.js se usará para exportar todos las funciones de los controladores que hagamos. Normalmente nombraremos los controladores de acuerdo a aquello que controlen, por ejemplo si un controlador manejará la información de los usuarios lo llamaremos controladorDeUsuarios.js (o userController.js si es que trabajas en equipos internacionales o quieres prevenirte para el futuro).
Dentro de src/controllers/home.js escribe el siguiente código
```javascript
import { variableDeEntorno } from '../settings';

export const indexPage = (req, res) => res.status(200).json({ message: variableDeEntorno });
```
como puedes darte cuenta simplemente movimos la función de src/routes/index.js a este nuevo archivo.
Ahora dentro de src/controllers/index.js escribe lo siguiente
```javascript
export * from './home';
```
con esto exportamos todas las funciones exportadas por el archivo home.js, esto nos permitirá importar estas funciones en otros archivos de manera más corta escribiendo algo como
```javascript
import { indexPage } from '../controllers';
```
en lugar de
```javascript
import { indexPage } from '../controllers/home';
```
Una vez que tenemos esto listo podemos modificar el contenido del archivo src/routes/index.js de la siguiente manera
```javascript
import express from 'express';
import { indexPage } from '../controllers';
const indexRouter = express.Router();

indexRouter.get('/', indexPage);

export default indexRouter;
```
los únicos cambios aquí son que importamos la función indexPage de nuestro controlador y reemplazamos con esta la función que antes teníamos dentro de indexRouter.get().
Ya tenemos nuestro primer controlador funcionando el cual sólo movió la función que nos devuelve nuestro mensaje a una nueva ubicación.
A partir de aquí puedes crear todo tipo de controladores que necesites o modificar el que ya tenemos para que se ajuste a tus necesidades.
Ejecuta los tests para comprobar que no se ha roto nada
```sh
yarn test
```
Si todo salió bien y los tests pasaron entonces es momento de guardar nuestro avance en git
```sh
git add .
git commit -m "Controlador creado para sacar la lógica de src/routes/"
```
## Conectando con una base de datos PostgreSQL
Nuestra aplicación funciona muy bien pero el mensaje que nos regresa es un mensajes fijo en el código, generalmente una aplicación en producción regresará mensajes o datos que se encuentran almacenados en una base de datos en lugar de estar escritos directamente en el código de la aplicación. En esta sección vamos a conectar nuestra aplicación con una base de datos PostgreSQL.
Vamos a conectar con la base de datos y vamos a guardar y a leer simples mensajes de texto, simplemente para mostrar cómo hacer la conexión y cómo realizar los procesos desde nuestra aplicación. Para crear la base de datos tenemos dos opciones, podemos usar una base local si instalamos PostgreSQL en nuestra máquina o podemos usar un servicio en línea como [ElephantSQL](https://www.elephantsql.com/) el cual tiene un plan gratis limitado a sólo 20MB pero que serán suficientes para nuestras pruebas.
Para comenzar vamos a instalar node-postgres en nuestra aplicación con el siguiente comando
```sh
yarn add pg
```
ahora abre el archivo settings.js y agregamos la siguiente línea de código
```javascript
export const direccionBaseDeDatos = process.env.URL_BASE_DE_DATOS;
```
y en nuestro archivo .env agregaremos lo siguiente
```
URL_BASE_DE_DATOS="postgresql://dbuser:dbpassword@localhost:5432/dbname"
```
En esta variable debemos cambiar dbuser por el nombre del usuario (o rol) al cual nos vamos a conectar dentro de la base de datos, dbpassword es la contraseña de dicho usuario y dbname es el nombre de la base de datos que usaremos para nuestro proyecto la cual ya debe haber sido creada. Si usas el servicio de ElephantSQL en el panel de control podrás encontrar la URL completa que necesitas, con lo cual sólo tienes que borrar la que tenemos y peger la que el servicio te da.
Dentro del directorio src/ crearemos un directorio llamado models/ y dentro de este crearemos los archivos pool.js y model.js.
Abrimos pool.js y agregamos lo siguiente
```javascript
import { Pool } from 'pg';
import dotenv from 'dotenv';
import { direccionBaseDeDatos } from '../settings';
dotenv.config();

export const pool = new Pool({ connectionString: direccionBaseDeDatos });
```
Primero importamos Pool y dotenv de las librerías pg y dotenv respectivamente. También importamos la dirección de nuestra base de datos que definimos en el ejemplo anterior, configuramos dotenv para poder usar nuestras variables en .env y finalmente establecemos la conexión con la base de datos y creamos un nuevo Pool con esta conexión. En node-postgres las acciones son ejecutadas cada una por un cliente y nuestro objeto pool no es más que una colección de clientes que se pueden comunicar con la base de datos para ejecutar las acciones que solicitemos.
Abrimos el archivo model.js y agregamos lo siguiente
```javascript
import { pool } from './pool';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on('error', (err, client) => `Error, ${err}, en el cliente ${client}`);
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause) query += clause;
    return this.pool.query(query);
  }
}

export default Model;
```
Hemos creado una clase Model, la cual acepta en su constructor la tabla de la base de datos con la cual deseamos trabajar.
Luego hemos creado un método select, el cual usaremos para leer datos de la base de datos. Esta función recibe la columna de que queremos obtener de la tabla y una clausala, tal como la clausula WHERE y devuelve el resultado en forma de Promise.
Podremos escribir los queries que deseemos siempre y cuando sean sentencias validas de SQL y puedan ser ejecutadas por la base de datos de PostrgreSQL.
### Creando la tabla y los datos en la base de datos
Antes de crear los endpoints vamos a escribir código para crear y rellenar una tabla de la cual obtendremos los datos en nuestros endpoints. Si ya cuentas con una base de datos puedes simplemente saltar a la siguiente sección y adaptar el ejemplo a tus necesidades.
Primero crearemos un directorio utils/ dentro de src/, este directorio podrá después ser descartado del proyecto cuando lo conectemos a la base de datos definitiva.
Dentro de utils/ vamos a crear 3 archivos: queries.js, queryFunctions.js y runQuery.js
Abrimos queries.js y agregamos lo siguiente
```javascript
export const crearTablaMensajes = `
DROP TABLE IF EXISTS mensajes;
CREATE TABLE IF NOT EXISTS mensajes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR DEFAULT '',
  mensaje VARCHAR NOT NULL
  )
  `;

export const insertarMensaje = `
INSERT INTO mensajes(nombre, mensaje)
VALUES ('Jesus', 'primer mensaje'),
      ('Sanchez', 'segundo mensaje')
`;

export const eliminarTablaMensajes = 'DROP TABLE IF EXISTS mensajes;';
```
Este archivo contiene nuestros comandos SQL. El primer comando borra y recrea la tabla mensajes, el segundo comando inserta dos filas en la tabla mensajes y el tercer comando elimina la tabla.
Ahora vamos al archivo queryFunctions.js e insertamos lo siguiente
```javascript
import { pool } from '../models/pool';
import {
  insertarMensaje,
  eliminarTablaMensajes,
  crearTablaMensajes,
} from './queries';

export const ejecutarQueries = async arr => new Promise(resolve => {
  const stop = arr.length;
  arr.forEach(async (q, index) => {
    await pool.query(q);
    if (index + 1 === stop) resolve();
  });
});

export const eliminarTablas = () => ejecutarQueries([eliminarTablaMensajes]);
export const crearTablas = () => ejecutarQueries([crearTablaMensajes]);
export const insertarEnLasTablas = () => ejecutarQueries([insertarMensaje]);
```
Aquí creamos las funciones para ejecutar los queries que definimos antes. La función ejecutarQueries toma una lista de queries y espera hasta que cada uno termina. Hay que recordar que este archivo sólo servirá para las pruebas que estamos haciendo y no es para ponerse en producción así que hemos seguido malas prácticas pero está bien para nuestro propósito.
En el archivo runQuery.js pegamos el siguiente código
```javascript
import { crearTablas, insertarEnLasTablas } from './queryFunctions';

(async () => {
  await crearTablas();
  await insertarEnLasTablas();
})();
```
este último es el archivo que ejecuta los queries para finalmente crear la tabla y rellenarla con datos para nuestras pruebas. Lo último es agregar el scirpt al archivo package.json
```json
"runQuery": "babel-node ./src/utils/runQuery"
```
y ejecutarlo
```sh
yarn runQuery
```
### Creando el controlador
Ahora que ya tenemos todo en su sitio podemos empezar con la dinámica TDD en la cual recordemos que primero se crea un test que prueba que se consiga lo que queremos conseguir y que en primera instancia fallará. Luego trabajamos en el código hasta logra que el test apruebe.
#### Creando el test
Crearemos el archivo test/mensajes.test.js y pegaremos el siguiente código
```javascript
import { server, BASE_URL } from './setup';

describe('Probando la conexión a la base de datos', () => {
  it('Obtener la lista de mensajes', (done) => {
    server
      .get(`${BASE_URL}/mensajes`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.mensajes[0]).toHaveProperty('nombre');
        done();
      });
  });
});
```
Este test prueba que recibamos una respuesta 200 y que la respuesta contenga una lista en donde el primer elemento contenga la propiedad nombre.
Ejecutaremos el comando
```sh
yarn test
```
el cual debe fallar indicándonos que el error es que nuestro test esperaba una respuesta 200 (Ok) pero en su lugar ha recibido una respuesta 404 (No encontrada).
Y ahora que ya tenemos un test mínimo con el cual nuestros test fallan trabajaremos en el código hasta que nuestro test apruebe.
#### Creando el código para aprobar el test
Creamos un nuevo archivo src/controllers/mensajes.js y pegamos el siguiente código
```javascript
import Model from '../models/model';

const modeloMensajes = new Model('mensajes');
export const paginaDeMensajes = async (req, res) => {
  try {
    const data = await modeloMensajes.select('nombre, mensaje');
    res.status(200).json({ mensajes: data.rows });
  } catch (err) {
    res.status(200).json({ error: err.stack });
  }
};
```
lo que hicimos fue importar nuestra clase Model y crear una nueva instancia la cual representa la tabla mensajes de nuestra base de datos. Luego cuando nuestra paginaDeMensajes sea llamada, esta hará la consulta de los mensajes y regresará los mensajes en un json si es que todo sale bien, o regresará un mensaje de error si algo sale mal.
En el archivo src/controllers/index.js agregamos la siguiente línea de código
```javascript
export * from './mensajes'
```
la cual nos dará acceso a la función recién creada paginaDeMensajes.
Ahora sólo falta agregar el endpoint a nuestro archivo src/routes/index.js
```javascript
//primero actualizamos los imports
import { indexPage, paginaDeMensajes } from '../controllers';

//y agregamos nuestro endpoint
indexRouter.get('/mensajes', paginaDeMensajes)
```
Ejecutamos nuestro test con
```sh
yarn test
```
y vemos cómo ambos test pasan esta vez.
¡Perfecto! Hemos creado una nueva funcionalidad siguiendo la metodología TDD. Ahora podremos agregar todo tipo de funcionalidad siguiendo los mismos pasos y eso nos asegurará que nuestra aplicación siempre funcionará como esperamos y no romperemos nada al agregar nuevas funciones. Recuerda que primero debes escribir un test sencillo que no pase y luego agregar el mínimo código necesario para que el test pase. ¿Y qué pasa si la funcionalidad que quiero agregar es mucho más compleja? En ese caso habrá que dividir dicha funcionalidad en casos más simples, tan simples como sea posible, y crear un test sencillo para uno de esos casos, luego asegurarte de que tu nuevo test no pasa la prueba, luego escribir el mínimo de código necesario para pasar la prueba y repetir con el siguiente caso.
Ahora visitemos http://localhost:3000/mensajes y debemos ver una lista de nuestros mensajes.
Con todo en su lugar, es momento de guardar nuestro avance en git
```sh
git add .
git commit -m "Conexión con la base de datos lista"
```
## Creando endpoints para otras operaciones CRUD
Ya creamos un endpoint para probar la respuesta que nos da la base de datos cuando solicitamos el contenido de la tabla que hicimos en los pasos anteriores. Sin embargo vamos ahora a probar cómo realizar las demás operaciones CRUD, el cual es un acrónimo para Create (crear), Read (leer), Update (actualizar) y Delete (eliminar).
Antes de empezar con los endpoints necesitamos hacer nuestras pruebas en una base de datos de prueba. Puesto que vamos a estar escribiendo, actualizando y borrando datos no es conveniente realizar estas pruebas en nuestra base de datos de producción.
Una vez que tengamos la base de datos de prueba creada, ya sea que contenga datos o no, vamos a crear un archivo hooks.js en nuestro directorio test/ en el cual incluiremos el siguiente código
```javascript
import { pool } from '../src/models/pool';
import { crearTablaMensajes, insertarMensaje, eliminarTablaMensajes } from '../src/utils/queries'

export async function before(){
    const client = await pool.connect()
    await client.query(crearTablaMensajes)
    await client.query(insertarMensaje)
    client.release()
}

export async function after(){
    await pool.query(eliminarTablaMensajes)
    await pool.end()
}
```
este archivo importa el objeto pool para poder utilizar la conexión a la base de datos y también importa los queries que creamos en el directorio utils/. Recuerda que todo el contenido de este directorio será desechado, sin embargo aquí nos será útil para no tener que repetir queries que ya habíamos escrito antes.
El archivo exporta dos funciones: before la cual será ejecutada antes de cada suite de pruebas (recuerda, las que definimos dentro de la función describe() en nuestro archivo de test) y after, la cual se ejecuta al finalizar nuestra suite de pruebas. Esto quiere decir que dentro de before podemos ajustar la base de datos para que esté lista para nuestros tests. En este caso eliminamos la tabla anterior de mensajes y creamos una tabla nueva con la función client.query(crearTablaMensajes) y la rellenamos con los mismos datos que originalmente le pusimos con client.query(insertarMensaje). Y en after podemos incluir cualquier tipo de limpieza que se requiera posterior a los tests, como en nuestro caso que eliminamos la tabla una ver terminadas las pruebas y desconectamos el objeto pool.
Ahora modificaremos nuestro archivo test/mensajes.test.js para que se vea así
```javascript
import { server, BASE_URL } from './setup';
import { before, after } from './hooks';

describe('Probando la conexión a la base de datos', () => {

  beforeAll(before);
  afterAll(after);
  
  it('Obtener la lista de mensajes', (done) => {
    server
      .get(`${BASE_URL}/mensajes`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.mensajes[0]).toHaveProperty('nombre');
        done();
      });
  });
});
```
como se puede apreciar lo único que hemos cambiado es que importamos las funciones before y after recién creadas y se las pasamos como argumento a las funciones beforeAll y afterAll respectivamente. Estas funciones beforeAll y afterAll son proporcionadas por Jest y nos permiten justamente ejecutar el código antes y después de todos los tests dentro de esta suite, no obstante también podríamos requerir realizar esta clase de limpieza antes y después de cada test, con lo cual cambiaríamos beforeAll por beforeEach y y afterAll por afterEach e incluso podríamos definir en nuestro archivo hooks.js diferentes funciones para que se ejecuten antes de todos los tests y otras para ejecutarse antes de cada uno de los tests, dándonos la posibilidad de realizar limpiezas generales para todo los tests y limpiezas más particulares para cada uno de los tests.
Es momento de comprobar que no se ha roto nada y que nuestras funciones before y after funcionan correctamente. Ejecutemos los tests con
```sh
yarn test
```
y comprobemos que los tests pasan sin problemas. Luego vayamos a la base de datos para corroborar que la tabla ha sido borrada. Volvamos a ejecutar los tests para ver que son las funciones before y after las que están realizando el proceso de creación y borrado de la tabla para poder realizar los tests y luego limpiar la base de datos.
### Creando el endpoint para la creación (C)
Tal cual hicimos al crear el endpoint anterior vamos a seguir la metodología TDD, primero crearemos el test para la funcionalidad que queremos lograr y luego crearemos la funcionalidad en sí.
Como tenemos que comprobar varias cosas al crear un nuevo dato, como por ejemplo el que el conteo de datos (mensajes en nuestro caso) aumente, que los datos que enviamos a guardar son lo que terminan verdaderamente guardados, etc. Vamos a crear un test simple por vez y pasaremos a crear la funcionalidad para pasar el test, y una vez que el test haya pasado entonces regresaremos para crear el siguiente test.
Lo primero que necesitamos probar es que nuestro endpoint regrese un status 200. Para esto agregamos dentro de nuestro archivo mensajes.test.js el siguiente test dentro de nuestra suite
```javascript
  it('Verificar que el enpoint POST regresa status 200', (done) => {
    const data = {nombre: 'José', mensaje: 'Mensaje enviado'}
    server
      .post(`${BASE_URL}/mensajes`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).toEqual(200);
        done();
      });
  })
```
y ejecutamos nuestros tests con 
```sh
yarn test
```
para ver cómo nuestro test ahora falla.
Si revisamos los resultados de nuestro test veremos que la razón de que falla es justamente que al hacer la petición al servidor con un POST el resultado no es 200 sino 404, indicándonos de dicho enpoint no fue encontrado que es el resultado que esperamos ya que aún no lo hemos creado.
Ahora pasamos a escribir el código para que nuestro test pase. Empezaremos por agregar la siguiente función a nuestro archivo src/controllers/mensajes.js
```javascript
export const guardarMensaje = async (req, res) => {
  res.status(200).end()
}
```
y modificamos el archivo src/routes/index.js para importar esta función y usarla, de tal modo que el archivo terminará así
```javascript
import express from 'express';
import { indexPage, paginaDeMensajes, guardarMensaje } from '../controllers';
const indexRouter = express.Router();

indexRouter.get('/', indexPage);

indexRouter.get('/mensajes', paginaDeMensajes);

indexRouter.post('/mensajes', guardarMensaje);

export default indexRouter;
```
Ejecutamos nuevamente nuestro test y comprobamos que ahora pasa
yarn test
Muy bien, nuestro test pasó porque ahora ya existe el endpoint, sin embargo en realidad no hace nada todavía, para eso necesitamos irle agregando funcionalidad poco a poco. Esta dinámica de TDD puede parecer muy lenta en un inicio, sin embargo debemos mantener en mente que el desarrollo de software es más parecido a una maratón en la cual es mejor mantener un paso lento pero firme, que un spint en el cual debemos correr lo más rápido posible. Si intentaramos correr una maratón como si fuera un sprinte seguro que nos desmayamos ni bien hayamos recorrido el primer par de kilómetros y habremos perdido la carrera. Así que debemos tener paciencia por muy lento que el proceso parezca.
Probemos ahora a ver que nuestro endpoint es capaz de recibir información cuando se la enviamos. Escribamos el siguiente test en nuestra suite
```javascript
it('Comprobar que el endpoint POST recibe información', (done) => {
    const data = {nombre: 'José', mensaje: 'Mensaje enviado'}
    server
      .post(`${BASE_URL}/mensajes`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toEqual(data)
        done();
      });
  })
```
ahora ejecutamos nuestro test y vemos como falla, ya que el test espera que nuestro endpoint nos devuelva información sobre los datos que recibió, pero justo ahora nuestro endpoint sólo regresa un status 200. Cambiemos eso modificando nuestra función guardarMesaje dentro de src/controller/mensajes.js del siguiente modo
```javascript
export const guardarMensaje = async (req, res) => {
  res.status(200).json({data: req.body})
}
```
y probemos nuevamente nuestro test, el resultado ahora debe ser positivo.
Nuestro siguiente paso será probar que nuestro endpoint guarda los datos, para lo cual deberá guardar en la base de datos y obtener un id el cual lo enviará de regreso como parte de la respuesta.
Escribamos entonces el siguiente test
```javascript
  it('Comprobar que el endpoint POST devuelve el id del elemento guardado', (done) => {
    const data = {nombre: 'José', mensaje: 'Mensaje enviado'}
    server
      .post(`${BASE_URL}/mensajes`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('id')
        expect(res.body.id).toBeDefined()
        expect(res.body.id).toBeGreaterThan(0)
        done();
      });
  })
```
y comprobamos que el test no pasa debido a que nuestro endpoint no devuelve ningún id.
Ahora para pasar este test podemos hacer algo tan simple como regresar un id con un valor numérico mayor que 0 ya que es lo que nuestro test requiere para pasar. Y es exactamente eso lo que haremos puesto que TDD nos dice que debemos hacer lo mínimo que logre pasar el test y esto es lo mínimo.
Cambiemos pues la función guardarMensaje del siguiente modo
```javascript
export const guardarMensaje = async (req, res) => {
  res.status(200).json({data: req.body, id: 1})
}
```
y al ejecutar nuestro test vemos como el test pasa. ¡Yey!
Sé que esto parece ridículo y tramposo, pero hay que tener un poco de fe en el sistema y seremos recompensados, ya verán, sólo debemos tener paciencia.
```javascript
  it('Comprobar que el endpoint POST hace que el conteo de datos aumente', (done) => {
    const data = {nombre: 'José', mensaje: 'Mensaje enviado'}
    let conteo;
    server
      .get(`${BASE_URL}/mensajes`)
      .expect(200)
      .then((res) => {
        expect(res.status).toEqual(200)
        expect(res.body.mensajes.length).toBeDefined()
        conteo = res.body.mensajes.length
        return server
          .post(`${BASE_URL}/mensajes`)
          .send(data)
          .expect(200)
      }).then((res) => {
        expect(res.status).toEqual(200)
        return server
          .get(`${BASE_URL}/mensajes`)
          .expect(200)
      }).then((res) => {
        expect(res.status).toEqual(200)
        expect(res.body.mensajes.length).toBeGreaterThan(conteo)
        done()
      })
  })
```
como podemos observar este test es algo más complejo que los anteriores sin embargo con lo que ya sabemos podemos notar que sólo hace 3 cosas, primero solicita la lista de mensajes para poder obtener un conteo de los mensajes previo a que llamemos a nuestro endpoint, luego llama a nuestro endpoint para guardar el nuevo dato y finalmente vuelve a solicitar la lista para comprobar que el conteo ha aumentado.
Ejecutamos nuestro test y vemos como falla debido a que esperaba que el conteo aumentara pero el conteo no aumentó.
Ahora sí será necesario empezar a trabajar para resolver el problema del endpoint pues ahora no nos servirá un resultado tramposo. Esta vez vamos por el oro (es una forma de decir que ya vamos a implementar la funcionalidad que realmente necesitamos).
Primero modificamos nuestra función guardar mensaje del siguiente modo
```javascript
export const guardarMensaje = async (req, res) => {
  try {
    const resultado = await modeloMensajes.insert('nombre, mensaje', req.body)
    const {id, ...data} = resultado.rows[0]
    res.status(200).json({data, id})
  }catch(err){
    res.status(200).json({ error: err.stack });
  }
}
```
debido a que estamos haciendo consultas a la base de datos, lo mejor es poner la funcionalidad dentro de un `try/catch`, intentamos insertar el nombre y mensaje recibido en el request, si la consulta termina bien desestructuramos el resultado para obtener el id como dato independiente y obtener data como el resto de datos, que en este caso son el nombre y el mensaje que acabamos de guardar y listo, devolvemos esos valores en la respuesta. Si la consulta falla entonces devolveremos un mensaje de error que hará que nuestros tests de este endpoint fallen.
Pero como no tenemos aún la función insert en nuestro modelo debemos crearla, vamos al archivo src/models/model.js y dentro de la clase Model agregamos la siguiente función
```javascript
async insert(columns, values){
    const listaValores = Object.keys(values).map((item, index) => `$${index+1}`).join(', ')
    const texto = `INSERT INTO ${this.table}(${columns}) VALUES (${listaValores}) RETURNING *`
    const valores = Object.values(values)
    return this.pool.query(texto, valores)
  }
```
esta función crea un query para insertar los valores que se le envíen en las columnas que se especifiquen y posteriormente regresa el Promise que ejecutará el query, el cual una vez resuelto será el que regresa el valor resultado que desestructuramos en el archivo src/controllers/mensajes.js hace un momento.
Y listo, corremos nuestro test y lo vemos pasar.
Una vez que veamos pasar nuestro test ya podemos guardar nuestro avance en git
```sh
git add .
git commit -m "Enpoint para guardar datos terminado"
```