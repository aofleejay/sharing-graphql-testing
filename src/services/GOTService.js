import axios from 'axios'
import { GOT_SERVICE } from '../constants/endpoints'

const getCharacters = () => axios.get(`${GOT_SERVICE}/characters`)

export { getCharacters }