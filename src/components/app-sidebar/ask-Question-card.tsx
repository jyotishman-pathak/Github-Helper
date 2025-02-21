import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Textarea } from '../ui/textarea'
import useProject from '~/hooks/use-project'
import { Button } from '../ui/button'
import {  Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger, } from '../ui/dialog'





const AskQuestionCard = () => {
    const {project} = useProject()
    const [open,setOpen] = useState(false)
    const [question, setQuestion] = useState<string>("")
    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setOpen(true)
        
    }
  return (
  <>
<Dialog open= {open} onOpenChange={setOpen}>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>





  <Card>
    <CardHeader>
        <CardTitle>Ask a question</CardTitle>    
    </CardHeader>
    <CardContent>
        <form onSubmit={onSubmit}>
        <Textarea
  placeholder="Which file should I edit to change the home page?"
  value={question }
  onChange={(e) => setQuestion(e.target.value)}
/>
        <div className="h-4"></div>
        <Button type='submit'>
            Ask Ai
        </Button>
        
        </form>
    </CardContent>
  </Card>
  
  </>
  )
}

export default AskQuestionCard