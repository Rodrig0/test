// Importar a função createApp do Vue
import { createApp } from 'vue'

// Importar o componente principal App.vue
import App from './App.vue'

// Importar o arquivo de configuração do roteador
import router from './router'

// Importar o arquivo CSS do Bootstrap
import 'bootstrap/dist/css/bootstrap.css'

// Criar a instância da aplicação Vue usando o componente App
const app = createApp(App)

// Informar à aplicação Vue para usar o roteador
app.use(router)

// Montar a aplicação no elemento HTML com o ID 'app'
app.mount('#app')
