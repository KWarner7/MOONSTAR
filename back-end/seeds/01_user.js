/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('user_table').del();

	const users = [
		{
			email: "alice.johnson@example.com",
			password: "password123",
			first_name: "Alice",
			last_name: "Johnson",
			rank: "Airman First Class",
			role: "Engineering",
			flight: "AlphaTech",
			section: "Electronics"
		},
		{
			email: "bob.smith@example.com",
			password: "password123",
			first_name: "Bob",
			last_name: "Smith",
			rank: "Senior Airman",
			role: "Engineering",
			flight: "BetaTech",
			section: "Software"
		},
		{
			email: "carol.davis@example.com",
			password: "password123",
			first_name: "Carol",
			last_name: "Davis",
			rank: "Staff Sergeant",
			role: "Management",
			flight: "GammaTech",
			section: "Hardware"
		},
		{
			email: "dave.wilson@example.com",
			password: "password123",
			first_name: "Dave",
			last_name: "Wilson",
			rank: "Technical Sergeant",
			role: "Quality Assurance",
			flight: "DeltaTech",
			section: "Testing"
		},
		{
			email: "eve.robinson@example.com",
			password: "password123",
			first_name: "Eve",
			last_name: "Robinson",
			rank: "Master Sergeant",
			role: "Design",
			flight: "EpsilonTech",
			section: "UI/UX"
		},
		{
			email: "frank.white@example.com",
			password: "password123",
			first_name: "Frank",
			last_name: "White",
			rank: "Senior Master Sergeant",
			role: "Operations",
			flight: "ZetaTech",
			section: "Networking"
		},
		{
			email: "grace.martin@example.com",
			password: "password123",
			first_name: "Grace",
			last_name: "Martin",
			rank: "Chief Master Sergeant",
			role: "Management",
			flight: "EtaTech",
			section: "Security"
		},
		{
			email: "harry.lee@example.com",
			password: "password123",
			first_name: "Harry",
			last_name: "Lee",
			rank: "Second Lieutenant",
			role: "Strategy",
			flight: "ThetaTech",
			section: "Communications"
		},
		{
			email: "irene.brown@example.com",
			password: "password123",
			first_name: "Irene",
			last_name: "Brown",
			rank: "First Lieutenant",
			role: "Development",
			flight: "IotaTech",
			section: "Research"
		},
		{
			email: "jack.jones@example.com",
			password: "password123",
			first_name: "Jack",
			last_name: "Jones",
			rank: "Captain",
			role: "Training",
			flight: "KappaTech",
			section: "Training & Development"
		},
		{
			email: "kate.perez@example.com",
			password: "password123",
			first_name: "Kate",
			last_name: "Perez",
			rank: "Major",
			role: "Operations",
			flight: "LambdaTech",
			section: "Infrastructure"
		},
		{
			email: "lucas.green@example.com",
			password: "password123",
			first_name: "Lucas",
			last_name: "Green",
			rank: "Lieutenant Colonel",
			role: "Management",
			flight: "MuTech",
			section: "Logistics"
		},
		{
			email: "mary.turner@example.com",
			password: "password123",
			first_name: "Mary",
			last_name: "Turner",
			rank: "Colonel",
			role: "Strategy",
			flight: "NuTech",
			section: "Strategic Planning"
		},
		{
			email: "nathan.harris@example.com",
			password: "password123",
			first_name: "Nathan",
			last_name: "Harris",
			rank: "Brigadier General",
			role: "Upper Management",
			flight: "XiTech",
			section: "Higher Command"
		},
		{
			email: "olivia.clark@example.com",
			password: "password123",
			first_name: "Olivia",
			last_name: "Clark",
			rank: "Major General",
			role: "Executive",
			flight: "OmicronTech",
			section: "Executive Command"
		},
		{
			email: "peter.wright@example.com",
			password: "password123",
			first_name: "Peter",
			last_name: "Wright",
			rank: "Lieutenant General",
			role: "Leadership",
			flight: "PiTech",
			section: "Joint Chiefs"
		},
		{
			email: "quinn.gonzalez@example.com",
			password: "password123",
			first_name: "Quinn",
			last_name: "Gonzalez",
			rank: "General",
			role: "Chief of Staff",
			flight: "RhoTech",
			section: "Pentagon Leadership"
		}
	];

	await knex('user_table').insert(users);
};
