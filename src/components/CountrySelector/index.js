import {
  FormControl,
  FormHelperText,
  InputLabel,
  NativeSelect,
  makeStyles,
} from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: `${theme.spacing(3)}px 0`,
  },
}))

export default function CountrySelector({ countries, value, handleOnChange }) {
  const styles = useStyles()
  return (
    <FormControl className={styles.formControl}>
      <InputLabel htmlFor='country-selector' shrink>
        Quốc gia
      </InputLabel>
      <NativeSelect
        value={value}
        onChange={handleOnChange}
        inputProps={{
          name: 'country',
          id: 'country-selector',
        }}>
        {countries.map((country) => (
          <option
            key={country.ISO2.toLowerCase()}
            value={country.ISO2.toLowerCase()}>
            {country.Country}
          </option>
        ))}
      </NativeSelect>
      <FormHelperText>Lựa chọn Quốc gia</FormHelperText>
    </FormControl>
  )
}
