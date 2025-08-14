import axiosInstance from '@/config/axios';

export interface UserSearchResult {
  _id: string;
  id?: string;
  name: string;
  email: string;
  phone?: string;
  profile?: {
    first_name?: string;
    last_name?: string;
    phone?: string;
  };
}

export interface CreateUserData {
  name: string;
  email: string;
  phone: string;
  password?: string;
  role?: string;
}

class UserService {
  /**
   * Busca usuarios por nombre o email
   */
  async searchUsers(query: string): Promise<UserSearchResult[]> {
    try {
      if (!query || query.length < 2) {
        return [];
      }

      const response = await axiosInstance.get(`/api/admin/users/list`, {
        params: {
          search: query,
          limit: 10,
          role: 'user' // Solo buscar usuarios normales, no admins
        }
      });

      // Formatear resultados para el componente
      return response.data.users.map((user: any) => ({
        _id: user._id,
        id: user._id,
        name: user.name || `${user.profile?.first_name || ''} ${user.profile?.last_name || ''}`.trim() || user.email,
        email: user.email,
        phone: user.profile?.phone || user.phone || ''
      }));
    } catch (error) {
      console.error('Error al buscar usuarios:', error);
      return [];
    }
  }

  /**
   * Crea un nuevo usuario (cliente)
   */
  async createUser(userData: CreateUserData): Promise<UserSearchResult> {
    try {
      const response = await axiosInstance.post(`/api/admin/users`, {
        ...userData,
        role: userData.role || 'user',
        password: userData.password || this.generateTempPassword(),
        status: 'active',
        profile_completed: false
      });

      return {
        _id: response.data.user._id,
        id: response.data.user._id,
        name: response.data.user.name,
        email: response.data.user.email,
        phone: response.data.user.phone || ''
      };
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }

  /**
   * Verifica si un email ya existe
   */
  async checkEmailExists(email: string): Promise<boolean> {
    try {
      // Por ahora, buscar usuarios con ese email
      const users = await this.searchUsers(email);
      return users.some(user => user.email.toLowerCase() === email.toLowerCase());
    } catch (error) {
      console.error('Error al verificar email:', error);
      return false;
    }
  }

  /**
   * Genera una contraseña temporal
   */
  private generateTempPassword(): string {
    return 'Temp' + Math.random().toString(36).slice(-8) + '!';
  }
}

// Exportar una instancia única del servicio
export const userService = new UserService();