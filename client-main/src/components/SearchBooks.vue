<template>
  <div>
    <!-- Campo de entrada para busca de livros -->
    <input type="text" v-model="query" placeholder="Search for books" />
    <!-- Botão para iniciar a busca -->
    <button @click="searchBooks">Search</button>
    <ul>
      <!-- Lista de livros retornados pela busca -->
      <li v-for="book in books" :key="book.id">
        <h3>{{ book.volumeInfo.title }}</h3>
        <p>{{ book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author' }}</p>
        <!-- Botão para adicionar o livro à lista de leitura -->
        <button @click="addToReadingList(book)">Add to Reading List</button>
      </li>
    </ul>
    <!-- Exibir mensagem de erro, se houver -->
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      query: '', // Query de busca
      books: [], // Lista de livros retornados
      error: '' // Mensagem de erro
    };
  },
  methods: {
    // Método para buscar livros usando a API do Google Books
    searchBooks() {
      axios.get(`http://localhost:5004/search_books?q=${this.query}`)
        .then(response => {
          console.log(response.data);
          this.books = response.data.items || [];
          this.error = '';
        })
        .catch(error => {
          console.error(error);
          this.error = 'Error fetching data from Google Books API';
        });
    },
    // Método para adicionar um livro à lista de leitura
    addToReadingList(book) {
      const payload = {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author',
        read: false,
      };
      axios.post('http://localhost:5004/books', payload)
        .then(() => {
          alert('Book added to reading list');
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
/* Adicione seus estilos aqui */
</style>
