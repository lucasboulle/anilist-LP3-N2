import React from 'react';
import { Container } from './styles';
import { MdSearch } from 'react-icons/md';
import TextField from '@material-ui/core/TextField';

const SearchBar: React.FC = () => {
  const [text, setText] = React.useState<String>()

  return (
    <Container>
      <MdSearch size={24} style={IconStyle} />
      <TextField
        id="standard-basic"
        label="Pesquisar"
        onChange={text => setText(text.target.value)}
        fullWidth={true}
        style={searchBarStyle}
      />
    </Container>
  )
}

const IconStyle = {
  marginTop: 16,
  marginRight: 5,
  color: '#202020',
}

const searchBarStyle = {
  width: 350
}

export default SearchBar;