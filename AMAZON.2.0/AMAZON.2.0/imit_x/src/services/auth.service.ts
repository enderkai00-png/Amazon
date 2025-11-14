// src/services/auth.service.ts
const API_URL = 'http://localhost:4000/api';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  role: 'client' | 'seller';
}

class AuthService {
  private readonly STORAGE_KEY = 'auth_data';

  /**
   * Login de usuario
   */
  async login(email: string, password: string, role: 'client' | 'seller'): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al iniciar sesión');
      }

      const data: AuthResponse = await response.json();
      
      // Guardar sesión en localStorage
      this.saveSession(data);
      
      return data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  /**
   * Registro de nuevo usuario
   */
  async signup(name: string, email: string, password: string, role: 'client' | 'seller'): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al registrarse');
      }

      const userData = await response.json();
      const authData: AuthResponse = {
        user: {
          id: userData.id,
          name: userData.name,
          email: userData.email,
        },
        role: userData.role,
      };
      
      // Guardar sesión en localStorage
      this.saveSession(authData);
      
      return authData;
    } catch (error) {
      console.error('Error en signup:', error);
      throw error;
    }
  }

  /**
   * Cerrar sesión
   */
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Guardar sesión en localStorage
   */
  private saveSession(authData: AuthResponse): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(authData));
  }

  /**
   * Obtener sesión actual
   */
  getCurrentSession(): AuthResponse | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
      return null;
    } catch (error) {
      console.error('Error al obtener sesión:', error);
      return null;
    }
  }

  /**
   * Verificar si hay un usuario autenticado
   */
  isAuthenticated(): boolean {
    return this.getCurrentSession() !== null;
  }

  /**
   * Obtener usuario actual
   */
  getCurrentUser(): User | null {
    const session = this.getCurrentSession();
    return session ? session.user : null;
  }

  /**
   * Obtener rol actual
   */
  getCurrentRole(): 'client' | 'seller' | null {
    const session = this.getCurrentSession();
    return session ? session.role : null;
  }

  /**
   * Cambiar de cuenta (logout y redirigir a login)
   */
  switchAccount(): void {
    this.logout();
  }
}

export default new AuthService();
