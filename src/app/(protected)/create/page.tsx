"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/trpc/react";

const formSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  githubUrl: z.string().url("Enter a valid GitHub URL"),
  githubToken: z.string().optional(),
});

const CreatePage = () => {
  const createProject = api.project.createProject.useMutation()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      githubUrl: "",
      githubToken: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  createProject.mutate({
    name: values.projectName,
    githubUrl:values.githubUrl,
    githubToken:values.githubToken
    
  })
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-primary opacity-80 text-xl md:text-2xl">
            Enter your Project Details to Continue
          </CardTitle>
        </CardHeader>
        
        <div className="p-4 md:p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="Enter project name" 
                        {...field} 
                        className="h-12 md:h-14 text-sm md:text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="Enter GitHub URL" 
                        {...field} 
                        className="h-12 md:h-14 text-sm md:text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="githubToken"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="Enter GitHub Token (optional)" 
                        {...field} 
                        className="h-12 md:h-14 text-sm md:text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
              disabled= {createProject.isPending}
                type="submit" 
                className="w-full md:w-auto px-8 h-12 md:h-14 text-sm md:text-base transition-all"
              >
                Create Project
              </Button>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default CreatePage;