<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Lista de leitura</h1>
        <hr><br><br>
        <alert :message="message" v-if="showMessage"></alert>
        <button
          type="button"
          class="btn btn-success btn-sm"
          @click="toggleAddBookModal">
          Adicionar Livro
        </button>
        <button
          type="button"
          class="btn btn-primary btn-sm"
          @click="toggleSearchBookModal">
          Buscar Livros
        </button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Título</th>
              <th scope="col">Autor</th>
              <th scope="col">Já lido?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(book, index) in books" :key="index">
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>
                <span v-if="book.read">Sim</span>
                <span v-else>Não</span>
              </td>
              <td>
                <div class="btn-group" role="group">
                  <button
                    type="button"
                    class="btn btn-warning btn-sm"
                    @click="toggleEditBookModal(book)">
                    Editar
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="handleDeleteBook(book)">
                    Apagar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de adicionar livros -->
    <div
      ref="addBookModal"
      class="modal fade"
      :class="{ show: activeAddBookModal, 'd-block': activeAddBookModal }"
      tabindex="-1"
      role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Adicionar um novo livro</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="toggleAddBookModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="addBookTitle" class="form-label">Título:</label>
                <input
                  type="text"
                  class="form-control"
                  id="addBookTitle"
                  v-model="addBookForm.title"
                  placeholder="Enter title">
              </div>
              <div class="mb-3">
                <label for="addBookAuthor" class="form-label">Autor:</label>
                <input
                  type="text"
                  class="form-control"
                  id="addBookAuthor"
                  v-model="addBookForm.author"
                  placeholder="Enter author">
              </div>
              <div class="mb-3 form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="addBookRead"
                  v-model="addBookForm.read">
                <label class="form-check-label" for="addBookRead">Já lido?</label>
              </div>
              <div class="btn-group" role="group">
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  @click="handleAddSubmit">
                  Adicionar
                </button>
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  @click="handleAddReset">
                  Resetar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="activeAddBookModal" class="modal-backdrop fade show"></div>

    <!-- Modal de editar livros -->
    <div
      ref="editBookModal"
      class="modal fade"
      :class="{ show: activeEditBookModal, 'd-block': activeEditBookModal }"
      tabindex="-1"
      role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Atualizar</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="toggleEditBookModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="editBookTitle" class="form-label">Título:</label>
                <input
                  type="text"
                  class="form-control"
                  id="editBookTitle"
                  v-model="editBookForm.title"
                  placeholder="Enter title">
              </div>
              <div class="mb-3">
                <label for="editBookAuthor" class="form-label">Autor:</label>
                <input
                  type="text"
                  class="form-control"
                  id="editBookAuthor"
                  v-model="editBookForm.author"
                  placeholder="Enter author">
              </div>
              <div class="mb-3 form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="editBookRead"
                  v-model="editBookForm.read">
                <label class="form-check-label" for="editBookRead">Já lido?</label>
              </div>
              <div class="btn-group" role="group">
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  @click="handleEditSubmit">
                  Enviar
                </button>
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  @click="handleEditCancel">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="activeEditBookModal" class="modal-backdrop fade show"></div>

    <!-- Modal de buscar livros -->
    <div
      ref="searchBookModal"
      class="modal fade"
      :class="{ show: activeSearchBookModal, 'd-block': activeSearchBookModal }"
      tabindex="-1"
      role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Buscar Livros</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="toggleSearchBookModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="searchBooks">
              <div class="mb-3">
                <label for="searchBookQuery" class="form-label">Título:</label>
                <input
                  type="text"
                  class="form-control"
                  id="searchBookQuery"
                  v-model="searchQuery"
                  placeholder="Título do livro">
              </div>
              <button type="submit" class="btn btn-primary btn-sm">Buscar</button>
            </form>
            <br>
            <ul v-if="searchResults.length > 0">
              <li v-for="book in searchResults" :key="book.id">
                <h3>{{ book.volumeInfo.title }}</h3>
                <p>{{ book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author' }}</p>
                <button
                  type="button"
                  class="btn btn-success btn-sm"
                  @click="addToReadingList(book)">
                  Adicionar à Lista de Leitura
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-if="activeSearchBookModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import axios from 'axios';
import Alert from './Alert.vue';

export default {
  data() {
    return {
      activeAddBookModal: false,
      activeEditBookModal: false,
      activeSearchBookModal: false,
      addBookForm: {
        title: '',
        author: '',
        read: [],
      },
      books: [],
      editBookForm: {
        id: '',
        title: '',
        author: '',
        read: [],
      },
      searchQuery: '',
      searchResults: [],
      message: '',
      showMessage: false,
    };
  },
  components: {
    alert: Alert,
  },
  methods: {
    addBook(payload) {
      const path = 'http://localhost:5004/books';
      axios.post(path, payload)
        .then(() => {
          this.getBooks();
          this.message = 'Livro adicionado com sucesso!';
          this.showMessage = true;
        })
        .catch((error) => {
          console.log(error);
          this.message = 'Preencha todos os campos!';
          this.showMessage = true;
          this.getBooks();
        });
    },
    getBooks() {
      const endpoint = 'http://localhost:5004/books';
      axios.get(endpoint)
        .then((response) => {
          this.books = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    handleAddReset() {
      this.initForm();
    },
    handleAddSubmit() {
      this.toggleAddBookModal();
      let read = false;
      if (this.addBookForm.read[0]) {
        read = true;
      }
      const payload = {
        title: this.addBookForm.title,
        author: this.addBookForm.author,
        read,
      };
      this.addBook(payload);
      this.initForm();
    },
    handleDeleteBook(book) {
      this.removeBook(book.id);
    },
    handleEditCancel() {
      this.toggleEditBookModal(null);
      this.initForm();
      this.getBooks();
    },
    handleEditSubmit() {
      this.toggleEditBookModal(null);
      let read = false;
      if (this.editBookForm.read) read = true;
      const payload = {
        title: this.editBookForm.title,
        author: this.editBookForm.author,
        read,
      };
      this.updateBook(payload, this.editBookForm.id);
    },
    initForm() {
      this.addBookForm.title = '';
      this.addBookForm.author = '';
      this.addBookForm.read = [];
      this.editBookForm.id = '';
      this.editBookForm.title = '';
      this.editBookForm.author = '';
      this.editBookForm.read = [];
    },
    removeBook(bookID) {
      const path = `http://localhost:5004/books/${bookID}`;
      axios.delete(path)
        .then(() => {
          this.getBooks();
          this.message = 'Livro removido com sucesso!';
          this.showMessage = true;
        })
        .catch((error) => {
          console.error(error);
          this.getBooks();
        });
    },
    toggleAddBookModal() {
      const body = document.querySelector('body');
      this.activeAddBookModal = !this.activeAddBookModal;
      if (this.activeAddBookModal) {
        body.classList.add('modal-open');
      } else {
        body.classList.remove('modal-open');
      }
    },
    toggleEditBookModal(book) {
      if (book) {
        this.editBookForm = book;
      }
      const body = document.querySelector('body');
      this.activeEditBookModal = !this.activeEditBookModal;
      if (this.activeEditBookModal) {
        body.classList.add('modal-open');
      } else {
        body.classList.remove('modal-open');
      }
    },
    toggleSearchBookModal() {
      const body = document.querySelector('body');
      this.activeSearchBookModal = !this.activeSearchBookModal;
      if (this.activeSearchBookModal) {
        body.classList.add('modal-open');
      } else {
        body.classList.remove('modal-open');
      }
    },
    searchBooks() {
      axios.get(`http://localhost:5004/search_books?q=${this.searchQuery}`)
        .then(response => {
          this.searchResults = response.data.items || [];
        })
        .catch(error => {
          console.error(error);
        });
    },
    addToReadingList(book) {
      const payload = {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author',
        read: false,
      };
      axios.post('http://localhost:5004/books', payload)
        .then(() => {
          this.toggleSearchBookModal();
          this.getBooks();
          this.message = 'Livro adicionado com sucesso!';
          this.showMessage = true;
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
  created() {
    this.getBooks();
  },
};
</script>

<style scoped>
/* Adicione seus estilos aqui */
</style>
