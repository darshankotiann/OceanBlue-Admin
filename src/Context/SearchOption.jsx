import React from 'react'
import Select from 'react-select'

const SearchableSelect = ({ label = false, placeholder, onChange, options = [], value, required = false, id, isMulti, className }) => {
	return (
		<>
			<div className={'flex flex-col Lexend relative text-white ' + className}>
				{label && <label className='text-white mb-1' htmlFor={id}>{label}</label>}
				<Select styles={{
					control: (styles, { isFocused }) => {
						return ({ ...styles, backgroundColor: 'white', padding: "0.43rem", boxShadow: isFocused ? `0 4px 6px -1px rgba(28 195 122, 0.45), 0 2px 4px -2px rgba(28 195 122 0.45)` : `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`, borderRadius: "0.375rem", border: `1px solid rgb(229, 231, 235)`, color: "#fff" })
					},
					option: (styles, { data, isDisabled, isFocused, isSelected }) => {
						return {
							...styles,
							backgroundColor: isFocused ? 'rgba(17, 24, 39, 0.4)' : "#fff",
							color: '#000',
						};
					},
					theme: (theme) => ({
						...theme,
						borderRadius: 0,
						colors: {
							...theme.colors,
							primary25: 'green',
							primary: '#fff',
						},
					})
				}} isMulti={isMulti} required={required} options={options} onChange={onChange} value={value} placeholder={placeholder} />
			</div>
		</>
	)
}

export default SearchableSelect