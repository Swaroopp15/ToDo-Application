import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { from,Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient('https://xdsahzxkunzvkdyznwnw.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhkc2FoenhrdW56dmtkeXpud253Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg3NzY4NzQsImV4cCI6MjAzNDM1Mjg3NH0.7GhC_1xXE9jpYLD-OS_wzqgsWy-sFFlFu8sWVEHVAtY');

  }



  async register(email: string, password: string) {
    console.log(this.supabase)
    let res = await this.supabase.auth.signUp({ "email": email, "password": password });
    return res;
  }



  async login(email: string, password: string) {
    let ress = await this.supabase.auth.signInWithPassword({ email, password });
    console.log(ress)
    return ress;
  }

  async submittask(name: string, desc: string, duetime: number, priority: number, user: string | null) {
    const { error } = await this.supabase
      .from('tasks')
      .insert({ name: name, description: desc, duetime: duetime, priority: priority, userid: user })
    if (error) {
      console.log('error occured!')
      return 'err';
    }
    else return 'noerror';
  }

 fetchtask(): Observable<any> {
    const ress = this.supabase
      .from('tasks')
      .select();

    return from(ress);
  }
  deletetask(name: string){
    const res= this.supabase
    .from('tasks') 
    .delete()
    .eq('taskid',name)
    return from(res);
  }
  updatetask(name :string ,desc : string , duetime: any, priority: number, taskid: string){
  const result= this.supabase
    .from('tasks')
    .update({  name: name, description: desc, duetime: duetime, priority: priority})
    .eq('taskid', taskid)
    console.log(result)
     return from(result);
  }
    
  fetchwithid(taskid : string){
    const ress = this.supabase
      .from('tasks')
      .select()
      .eq('taskid',taskid);
      
    return from(ress);

  }
}

