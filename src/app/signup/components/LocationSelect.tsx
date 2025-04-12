import React from 'react';
import { CheckCircle } from 'lucide-react';

// Michigan city options for the dropdown
export const michiganCities = [
	'Detroit',
	'Grand Rapids',
	'Ann Arbor',
	'Lansing',
	'Flint',
	'Dearborn',
	'Troy',
	'Farmington Hills',
	'Warren',
	'Livonia',
	'Sterling Heights',
	'Royal Oak',
	'Southfield',
	'Novi',
	'Other',
];

interface LocationSelectProps {
	value: string;
	error?: string;
	disabled?: boolean;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function LocationSelect({
	value,
	error,
	disabled,
	onChange,
}: LocationSelectProps) {
	return (
		<div>
			<label
				htmlFor='location'
				className='block font-medium mb-1'
			>
				Your Location
			</label>
			<select
				id='location'
				name='location'
				value={value}
				onChange={onChange}
				className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
					error ? 'border-red-500' : 'border-gray-300'
				}`}
				disabled={disabled}
			>
				<option value=''>Select your city</option>
				{michiganCities.map((city) => (
					<option
						key={city}
						value={city}
					>
						{city}
					</option>
				))}
			</select>
			{error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
			<p className='mt-1 text-sm text-muted-foreground flex items-center'>
				<CheckCircle
					size={14}
					className='inline mr-1'
				/>
				Michigan-focused community
			</p>
		</div>
	);
}
