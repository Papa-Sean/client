'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Search } from 'lucide-react';

// Dummy data representing merchandise
const dummyMerchItems = [
	{
		id: '1',
		name: 'Detroit Dev T-Shirt',
		description:
			'Comfortable cotton t-shirt with Detroit skyline and code design.',
		price: 24.99,
		sizes: ['S', 'M', 'L', 'XL', '2XL'],
		colors: ['Black', 'Navy', 'Gray'],
		image: '/merch/tshirt1.jpg',
		category: 'T-Shirts',
	},
	{
		id: '2',
		name: 'Michigan Coder Hoodie',
		description:
			'Warm pullover hoodie with Michigan outline and developer icons.',
		price: 49.99,
		sizes: ['S', 'M', 'L', 'XL', '2XL'],
		colors: ['Black', 'Blue', 'Gray'],
		image: '/merch/hoodie1.jpg',
		category: 'Hoodies',
	},
	{
		id: '3',
		name: 'What Up Doe Developer Cap',
		description:
			'Adjustable baseball cap with "What Up Doe" in code syntax.',
		price: 22.99,
		sizes: ['One Size'],
		colors: ['Black', 'Navy'],
		image: '/merch/cap1.jpg',
		category: 'Accessories',
	},
	{
		id: '4',
		name: 'Motor City Coder Mug',
		description: '12oz ceramic mug with Detroit tech-inspired designs.',
		price: 14.99,
		sizes: ['Standard'],
		colors: ['Black', 'White'],
		image: '/merch/mug1.jpg',
		category: 'Accessories',
	},
	{
		id: '5',
		name: 'Full Stack Detroit Long Sleeve',
		description:
			'Long sleeve tee with full stack developer tribute to Detroit.',
		price: 29.99,
		sizes: ['S', 'M', 'L', 'XL', '2XL'],
		colors: ['Black', 'Gray', 'Maroon'],
		image: '/merch/longsleeve1.jpg',
		category: 'T-Shirts',
	},
	{
		id: '6',
		name: 'Michigan Dev Stickers Pack',
		description: 'Set of 5 vinyl stickers with Michigan tech themes.',
		price: 9.99,
		sizes: ['Standard'],
		colors: ['Multi'],
		image: '/merch/stickers1.jpg',
		category: 'Accessories',
	},
];

// Available categories for filtering
const categories = ['All', 'T-Shirts', 'Hoodies', 'Accessories'];

export default function MerchPage() {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('All');

	// Filter merchandise based on search query and category
	const filteredMerch = dummyMerchItems.filter((item) => {
		const matchesSearch =
			item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.description.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesCategory =
			selectedCategory === 'All' || item.category === selectedCategory;

		return matchesSearch && matchesCategory;
	});

	// Mock placeholder images when real images aren't available
	const getMerchImage = (path) => {
		// For demo purposes, use colored backgrounds
		const colors = [
			'bg-blue-100',
			'bg-green-100',
			'bg-purple-100',
			'bg-amber-100',
			'bg-pink-100',
			'bg-cyan-100',
		];
		const index =
			parseInt(path.split(/[\/.]/).reverse()[1].replace(/\D/g, '')) - 1;
		return colors[index % colors.length];
	};

	return (
		<div className='container mx-auto px-4 py-8'>
			{/* Header Section */}
			<div className='text-center mb-8'>
				<h1 className='text-3xl md:text-4xl font-bold mb-3'>
					Detroit Dev Merch
				</h1>
				<p className='text-xl text-muted-foreground'>
					Show your Michigan developer pride with our branded apparel
				</p>
			</div>

			{/* Search and Filter Section */}
			<div className='flex flex-col md:flex-row justify-between items-center mb-8 gap-4'>
				<div className='relative w-full md:w-1/3'>
					<Search
						className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground'
						size={18}
					/>
					<input
						type='text'
						placeholder='Search merchandise...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className='pl-10 px-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-primary focus:outline-none'
					/>
				</div>

				<div className='flex gap-2 w-full md:w-auto'>
					{categories.map((category) => (
						<button
							key={category}
							className={`px-4 py-2 rounded-md ${
								selectedCategory === category
									? 'bg-primary text-primary-foreground'
									: 'bg-muted hover:bg-muted/80'
							}`}
							onClick={() => setSelectedCategory(category)}
						>
							{category}
						</button>
					))}
				</div>
			</div>

			{/* Shopify Integration Notice - would be replaced with actual embed */}
			<div className='bg-muted/30 border border-dashed border-muted-foreground/50 rounded-lg p-6 mb-8 text-center'>
				<p className='text-lg text-muted-foreground'>
					This is where the Shopify store would be embedded in
					production.
				</p>
				<p className='text-muted-foreground'>
					The items below are for demonstration purposes only.
				</p>
			</div>

			{/* Merchandise Grid */}
			{filteredMerch.length === 0 ? (
				<div className='text-center py-12'>
					<h2 className='text-2xl font-medium text-muted-foreground'>
						No merchandise found
					</h2>
					<p className='mt-2'>Try adjusting your search or filter.</p>
				</div>
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
					{filteredMerch.map((item) => (
						<div
							key={item.id}
							className='bg-card rounded-lg overflow-hidden shadow-lg transition-transform hover:shadow-xl'
						>
							{/* Product Image */}
							<div
								className={`h-64 relative ${getMerchImage(
									item.image
								)}`}
							>
								<div className='absolute inset-0 flex items-center justify-center'>
									<p className='text-xl font-bold'>
										{item.name.charAt(0)}
									</p>
								</div>
							</div>

							{/* Product Content */}
							<div className='p-6'>
								<div className='flex justify-between'>
									<h2 className='text-xl font-bold'>
										{item.name}
									</h2>
									<span className='font-bold text-primary'>
										${item.price}
									</span>
								</div>

								<p className='text-muted-foreground my-4'>
									{item.description}
								</p>

								<div className='flex flex-wrap gap-2 mb-4'>
									{item.sizes.map((size) => (
										<span
											key={size}
											className='bg-muted px-2 py-1 rounded-md text-sm'
										>
											{size}
										</span>
									))}
								</div>

								<div className='flex flex-wrap gap-2 mb-4'>
									{item.colors.map((color) => (
										<span
											key={color}
											className='bg-muted/50 px-2 py-1 rounded-md text-sm'
										>
											{color}
										</span>
									))}
								</div>

								<button className='mt-2 w-full bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors'>
									<ShoppingCart size={18} />
									<span>Add to Cart</span>
								</button>
							</div>
						</div>
					))}
				</div>
			)}

			{/* Help Section */}
			<div className='mt-12 p-6 bg-muted/30 rounded-lg text-center'>
				<h3 className='text-xl font-bold mb-2'>
					Have questions about our products?
				</h3>
				<p className='text-muted-foreground mb-4'>
					Contact us or check our sizing guide and shipping policies.
				</p>
				<div className='flex flex-wrap justify-center gap-4'>
					<Link
						href='#'
						className='text-primary font-medium hover:underline'
					>
						Sizing Guide
					</Link>
					<Link
						href='#'
						className='text-primary font-medium hover:underline'
					>
						Shipping Info
					</Link>
					<Link
						href='#'
						className='text-primary font-medium hover:underline'
					>
						Contact Support
					</Link>
				</div>
			</div>
		</div>
	);
}
