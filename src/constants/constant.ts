export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
]

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT: '/forgot-password',
  DASHBOARD: '/dashboard',
  PROJECTS: '/projects',
  ESTIMATIONS: '/estimations',
}

export default {LANGUAGES, ROUTES}

//  Project sample data
export const sampleData = [
  {
    id: 1,
    client: 'Olivia Martin',
    ref: '89PQR56789T1U2V3',
    name: 'Sarah Williams',
    projectNumber: 'PQRST9012R',
    area: 'Telangana',
    address: 'Mumbai, Maharastra',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    client: 'Michael Jones',
    ref: '67KLMN2345P6Q7R8',
    name: 'Robert Johnson',
    projectNumber: 'ABCDE1234F',
    area: 'Uttar Pradesh',
    address: 'Bhiwani, Haryana',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 3,
    client: 'John Doe',
    ref: '23PQR4567T8U9V1',
    name: 'Isabella Anderson',
    projectNumber: 'XYZAB6789C',
    area: 'Delhi',
    address: 'Avadi, Tamil Nadu',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 4,
    client: 'Ella Lewis',
    ref: '78STUV2345W6X7Y8',
    name: 'Christopher White',
    projectNumber: 'PQRST9012R',
    area: 'Karnataka',
    address: 'North Dum Dum, West Bengal',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 5,
    client: 'James Rodriguez',
    ref: '45KLMN8901P2Q3R4',
    name: 'Jane Smith',
    projectNumber: 'RSTUV9012B',
    area: 'Andhra Pradesh',
    address: 'Anantapur, Andhra Pradesh',
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
]

// Customer sample data
export const customerSampleData = [
  {
    id: '1',
    name: 'Olivia Martin',
    email: '',
    phone: '',
    address: '',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Michael Jones',
    email: '',
    phone: '',
    address: '',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    name: 'John Doe',
    email: '',
    phone: '',
    address: '',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },

  {
    id: '4',
    name: 'Ella Lewis',
    email: '',
    phone: '',
    address: '',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
]