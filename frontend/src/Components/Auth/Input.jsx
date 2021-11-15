import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";

import { Lock, VisibilityOff, Visibility } from "@material-ui/icons";

const Input = ({ name, handleChange, label, half, type, handleShowPassword, icon }) => (
	<Grid item xs={12} sm={half ? 6 : 12}>
		<TextField
			name={name}
			onChange={handleChange}
			variant="outlined"
			required
			fullWidth
			label={label}
			type={type}
			InputProps={
				name === "password"
					? {
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={handleShowPassword}>{type === "password" ? <Visibility /> : <VisibilityOff />}</IconButton>
								</InputAdornment>
							),
							startAdornment: (
								<InputAdornment position="start">
									<IconButton>
										<Lock />
									</IconButton>
								</InputAdornment>
							),
					  }
					: {
							startAdornment: (
								<InputAdornment position="start">
									<IconButton>{icon}</IconButton>
								</InputAdornment>
							),
					  }
			}
		/>
	</Grid>
);

export default Input;
