import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://xdsahzxkunzvkdyznwnw.supabase.co', 
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhkc2FoenhrdW56dmtkeXpud253Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg3NzY4NzQsImV4cCI6MjAzNDM1Mjg3NH0.7GhC_1xXE9jpYLD-OS_wzqgsWy-sFFlFu8sWVEHVAtY'
    );
  }

  register(email: string, password: string) {
    return from(this.supabase.auth.signUp({ email, password }));
  }

  login(email: string, password: string) {
    return from(this.supabase.auth.signInWithPassword({ email, password }));
  }

  submittask(name: string, desc: string, duetime: number, priority: number, user: string | null) {
    const result = this.supabase
      .from('tasks')
      .insert({ name: name, description: desc, duetime: duetime, priority: priority, userid: user });
    return from(result);
  }

  fetchtask(): Observable<any> {
    return from(this.supabase.from('tasks').select());
  }

  deletetask(name: string) {
    const result = this.supabase
      .from('tasks')
      .delete()
      .eq('taskid', name);
    return from(result);
  }

  updatetask(name: string, desc: string, duetime: any, priority: number, taskid: string) {
    const result = this.supabase
      .from('tasks')
      .update({ name: name, description: desc, duetime: duetime, priority: priority })
      .eq('taskid', taskid);
    return from(result);
  }

  fetchwithid(taskid: string) {
    return from(this.supabase
      .from('tasks')
      .select()
      .eq('taskid', taskid));
  }

  logout() {
    const result = this.supabase.auth.signOut();
    return from(result);
  }
}
