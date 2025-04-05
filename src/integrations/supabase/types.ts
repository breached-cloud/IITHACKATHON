export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      announcements: {
        Row: {
          content: string
          course_id: string | null
          created_at: string | null
          created_by: string
          creator_role: string
          expires_at: string | null
          id: string
          priority: string
          target_roles: string[]
          title: string
        }
        Insert: {
          content: string
          course_id?: string | null
          created_at?: string | null
          created_by: string
          creator_role: string
          expires_at?: string | null
          id?: string
          priority: string
          target_roles: string[]
          title: string
        }
        Update: {
          content?: string
          course_id?: string | null
          created_at?: string | null
          created_by?: string
          creator_role?: string
          expires_at?: string | null
          id?: string
          priority?: string
          target_roles?: string[]
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcements_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      assignment_submissions: {
        Row: {
          assignment_id: string
          comment: string | null
          course_id: string
          created_at: string | null
          feedback: string | null
          file_url: string | null
          grade: number | null
          id: string
          status: string
          student_id: string
          submission_date: string | null
          updated_at: string | null
        }
        Insert: {
          assignment_id: string
          comment?: string | null
          course_id: string
          created_at?: string | null
          feedback?: string | null
          file_url?: string | null
          grade?: number | null
          id?: string
          status: string
          student_id: string
          submission_date?: string | null
          updated_at?: string | null
        }
        Update: {
          assignment_id?: string
          comment?: string | null
          course_id?: string
          created_at?: string | null
          feedback?: string | null
          file_url?: string | null
          grade?: number | null
          id?: string
          status?: string
          student_id?: string
          submission_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assignment_submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_submissions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      assignments: {
        Row: {
          course_id: string
          created_at: string | null
          created_by: string
          description: string
          due_date: string
          file_url: string | null
          id: string
          max_points: number
          title: string
        }
        Insert: {
          course_id: string
          created_at?: string | null
          created_by: string
          description: string
          due_date: string
          file_url?: string | null
          id?: string
          max_points: number
          title: string
        }
        Update: {
          course_id?: string
          created_at?: string | null
          created_by?: string
          description?: string
          due_date?: string
          file_url?: string | null
          id?: string
          max_points?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          category: string
          created_at: string | null
          description: string
          duration: string
          enrolled: number | null
          id: string
          image: string | null
          instructor: string
          instructor_id: string | null
          level: string
          popular: boolean | null
          rating: number | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          duration: string
          enrolled?: number | null
          id?: string
          image?: string | null
          instructor: string
          instructor_id?: string | null
          level: string
          popular?: boolean | null
          rating?: number | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          duration?: string
          enrolled?: number | null
          id?: string
          image?: string | null
          instructor?: string
          instructor_id?: string | null
          level?: string
          popular?: boolean | null
          rating?: number | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          completed_lessons: string[] | null
          course_id: string | null
          created_at: string | null
          id: string
          last_accessed: string | null
          progress: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completed_lessons?: string[] | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed?: string | null
          progress?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completed_lessons?: string[] | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed?: string | null
          progress?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          content: string | null
          course_id: string | null
          created_at: string | null
          description: string
          duration: string
          id: string
          order_index: number
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          course_id?: string | null
          created_at?: string | null
          description: string
          duration: string
          id?: string
          order_index: number
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          course_id?: string | null
          created_at?: string | null
          description?: string
          duration?: string
          id?: string
          order_index?: number
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          course: string | null
          created_at: string | null
          department: string | null
          designation: string | null
          first_name: string | null
          id: string
          last_active: string | null
          last_name: string | null
          role: string | null
          roll_number: string | null
          semester: string | null
          subjects_taught: string[] | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          course?: string | null
          created_at?: string | null
          department?: string | null
          designation?: string | null
          first_name?: string | null
          id: string
          last_active?: string | null
          last_name?: string | null
          role?: string | null
          roll_number?: string | null
          semester?: string | null
          subjects_taught?: string[] | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          course?: string | null
          created_at?: string | null
          department?: string | null
          designation?: string | null
          first_name?: string | null
          id?: string
          last_active?: string | null
          last_name?: string | null
          role?: string | null
          roll_number?: string | null
          semester?: string | null
          subjects_taught?: string[] | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      quiz_attempts: {
        Row: {
          answers: Json
          completed_at: string | null
          id: string
          quiz_id: string
          score: number
          started_at: string | null
          status: string
          time_spent: number | null
          total_possible_score: number
          user_id: string
          user_name: string
        }
        Insert: {
          answers: Json
          completed_at?: string | null
          id?: string
          quiz_id: string
          score: number
          started_at?: string | null
          status: string
          time_spent?: number | null
          total_possible_score: number
          user_id: string
          user_name: string
        }
        Update: {
          answers?: Json
          completed_at?: string | null
          id?: string
          quiz_id?: string
          score?: number
          started_at?: string | null
          status?: string
          time_spent?: number | null
          total_possible_score?: number
          user_id?: string
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          correct_answer: Json
          explanation: string | null
          id: string
          options: Json | null
          points: number
          question: string
          quiz_id: string
          type: string
        }
        Insert: {
          correct_answer: Json
          explanation?: string | null
          id?: string
          options?: Json | null
          points: number
          question: string
          quiz_id: string
          type: string
        }
        Update: {
          correct_answer?: Json
          explanation?: string | null
          id?: string
          options?: Json | null
          points?: number
          question?: string
          quiz_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          allow_review: boolean | null
          available_from: string | null
          available_until: string | null
          course_id: string
          course_name: string
          created_at: string | null
          created_by: string
          description: string
          id: string
          max_attempts: number | null
          randomize_questions: boolean | null
          show_live_score: boolean | null
          status: string
          time_limit: number | null
          title: string
          total_points: number
          updated_at: string | null
        }
        Insert: {
          allow_review?: boolean | null
          available_from?: string | null
          available_until?: string | null
          course_id: string
          course_name: string
          created_at?: string | null
          created_by: string
          description: string
          id?: string
          max_attempts?: number | null
          randomize_questions?: boolean | null
          show_live_score?: boolean | null
          status: string
          time_limit?: number | null
          title: string
          total_points: number
          updated_at?: string | null
        }
        Update: {
          allow_review?: boolean | null
          available_from?: string | null
          available_until?: string | null
          course_id?: string
          course_name?: string
          created_at?: string | null
          created_by?: string
          description?: string
          id?: string
          max_attempts?: number | null
          randomize_questions?: boolean | null
          show_live_score?: boolean | null
          status?: string
          time_limit?: number | null
          title?: string
          total_points?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: {
          user_id: string
        }
        Returns: string
      }
      increment_one: {
        Args: {
          row_id: string
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
