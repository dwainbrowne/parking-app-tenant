# Parking Enforcement Portal

A comprehensive Nuxt 3 application for parking enforcement management, featuring both a self-serve form for quick requests and a full tenant portal for vehicle and guest parking management.

## Features

### 🚗 Self-Serve Form
- Submit parking requests or appeals without an account
- Automatic form pre-filling using localStorage (name and email only)
- License plate validation and formatting
- Conditional fields for appeals (Ticket ID)
- Mobile-first responsive design

### 🏢 Tenant Portal
- User authentication with JWT tokens
- Vehicle registration and management
- Guest parking reservations with monthly limits
- Reservation history and status tracking
- Mobile-optimized dashboard

### 🔧 Technical Features
- **Framework**: Nuxt 3 with Composition API
- **Styling**: Tailwind CSS with custom components
- **Validation**: Zod schemas for client and server
- **Authentication**: JWT-based with bcrypt password hashing
- **State Management**: Vue 3 Composition API with composables
- **TypeScript**: Full type safety throughout

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd parking-enforcement-portal

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Default Test Accounts

For testing the tenant portal, use these credentials:

**Tenant Account:**
- Email: `john@example.com`
- Password: `password`
- Unit: 101

**Owner Account:**
- Email: `jane@example.com`
- Password: `password`
- Unit: 205

## Project Structure

```
├── assets/css/           # Global styles and Tailwind config
├── composables/          # Vue composables for state management
│   ├── useAuth.ts       # Authentication logic
│   ├── useCachedUser.ts # localStorage management
│   ├── useVehicles.ts   # Vehicle management
│   └── useReservations.ts # Reservation management
├── middleware/          # Route middleware
│   └── auth.ts         # Authentication guard
├── pages/              # Application pages
│   ├── index.vue       # Home page with self-serve form
│   ├── login.vue       # Login page
│   ├── register.vue    # Registration page
│   └── dashboard.vue   # Tenant portal dashboard
├── server/api/         # API endpoints
│   ├── auth/          # Authentication endpoints
│   ├── vehicles/      # Vehicle management endpoints
│   ├── reservations/  # Reservation management endpoints
│   └── submit.ts      # Self-serve form submission
├── types/             # TypeScript type definitions
└── utils/             # Utility functions and validation
```

## API Endpoints

### Public Endpoints
- `POST /api/submit` - Submit self-serve form (no auth required)
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Protected Endpoints (require JWT token)
- `GET /api/auth/me` - Get current user info
- `GET /api/vehicles` - Get user's vehicles
- `POST /api/vehicles` - Add new vehicle
- `DELETE /api/vehicles/[id]` - Remove vehicle
- `GET /api/reservations` - Get user's reservations
- `POST /api/reservations` - Create new reservation
- `DELETE /api/reservations/[id]` - Cancel reservation

## Data Models

### Self-Serve Submission
```typescript
interface Submission {
  name: string;
  email: string;
  licensePlate: string;
  type: 'request' | 'appeal';
  ticketId?: string;      // only for appeals
  details: string;
  timestamp: string;
}
```

### Vehicle
```typescript
interface Vehicle {
  id?: string;
  licensePlate: string;
  make: string;
  model: string;
  color: string;
  isPrimary: boolean;
  createdAt?: Date;
}
```

### Guest Reservation
```typescript
interface GuestReservation {
  id?: string;
  guestName: string;
  guestPhone?: string;
  vehicle: Omit<Vehicle, 'isPrimary' | 'id'>;
  reservationStart: Date;
  reservationEnd: Date;
  status: 'pending' | 'approved' | 'denied' | 'expired';
  createdAt: Date;
  notes?: string;
}
```

## Deployment

### Cloudflare Pages + Workers

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Deploy to Cloudflare Pages:**
   - Connect your repository to Cloudflare Pages
   - Set build command: `npm run build`
   - Set output directory: `.output/public`

3. **Configure environment variables:**
   ```
   JWT_SECRET=your-secure-jwt-secret-key
   ```

4. **API Routes are automatically deployed as Cloudflare Workers**

### Alternative Deployment Options

The application can also be deployed to:
- Vercel
- Netlify
- Any Node.js hosting provider

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# JWT Secret for authentication (change in production)
JWT_SECRET=your-secure-jwt-secret-key-change-in-production

# App configuration
NUXT_PUBLIC_APP_NAME=Parking Enforcement Portal
```

### Customization

#### Styling
- Modify `assets/css/main.css` for global styles
- Update Tailwind configuration in `nuxt.config.ts`
- Customize component styles using Tailwind classes

#### Business Logic
- Adjust monthly guest parking limits in `server/api/reservations/index.ts`
- Modify validation rules in `utils/validation.ts`
- Update form fields and requirements as needed

#### Database Integration
The current implementation uses in-memory mock data. To integrate with a real database:

1. Replace mock data arrays with database queries
2. Update API endpoints to use your database client
3. Implement proper data persistence
4. Add database migrations if needed

## Security Considerations

- JWT tokens expire after 7 days
- Passwords are hashed using bcrypt
- Input validation on both client and server
- CORS headers configured for API endpoints
- Rate limiting should be implemented for production

## Development

### Adding New Features

1. **Create types** in `types/index.ts`
2. **Add validation schemas** in `utils/validation.ts`
3. **Create composables** for state management
4. **Build API endpoints** in `server/api/`
5. **Create UI components** in pages or components

### Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Support

For issues and questions:
1. Check the console for error messages
2. Verify environment variables are set correctly
3. Ensure all dependencies are installed
4. Check API endpoint responses in browser dev tools

## License

This project is licensed under the MIT License.