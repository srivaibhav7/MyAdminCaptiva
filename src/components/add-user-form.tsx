'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2, Sparkles, Check } from 'lucide-react';

import {
  addUserFormSchema,
  type AddUserFormValues,
} from '@/lib/types';
import { getMacSuggestion } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface AddUserFormProps {
  onAddUser: (data: AddUserFormValues) => void;
  existingMacAddresses: string[];
}

export default function AddUserForm({
  onAddUser,
  existingMacAddresses,
}: AddUserFormProps) {
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<AddUserFormValues>({
    resolver: zodResolver(addUserFormSchema),
    defaultValues: {
      username: '',
      password: '',
      macAddress: '',
      uploadLimitBites: 0,
      downloadLimitBites: 0,
    },
  });

  const onSubmit = (values: AddUserFormValues) => {
    onAddUser(values);
    form.reset();
    setSuggestion(null);
    toast({
      title: 'User Added',
      description: `User "${values.username}" has been successfully created.`,
    });
  };

  const handleSuggestMac = async () => {
    setIsSuggesting(true);
    setSuggestion(null);
    const result = await getMacSuggestion(existingMacAddresses);
    if (result.success && result.suggestedMacAddress) {
      setSuggestion(result.suggestedMacAddress);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
    setIsSuggesting(false);
  };
  
  const handleApplySuggestion = () => {
    if (suggestion) {
      form.setValue('macAddress', suggestion, { shouldValidate: true });
      setSuggestion(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Guest Account</CardTitle>
        <CardDescription>
          Fill in the details to add a new user to the portal.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., guest_user" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="e.g., S3cur3Pa$$" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="macAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MAC Address (Optional)</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input placeholder="e.g., 00:1A:2B:3C:4D:5E" {...field} />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleSuggestMac}
                      disabled={isSuggesting}
                      aria-label="Suggest MAC address"
                    >
                      {isSuggesting ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Sparkles className="text-accent" />
                      )}
                    </Button>
                  </div>
                  {suggestion && (
                     <div className="mt-2 flex items-center gap-2 text-sm">
                       <p className="text-muted-foreground">
                         Suggestion: <span className="font-mono text-foreground">{suggestion}</span>
                       </p>
                       <Button type="button" size="sm" variant="outline" onClick={handleApplySuggestion}>
                         <Check className="mr-1 h-4 w-4" />
                         Apply
                       </Button>
                     </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="uploadLimitBites"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Limit</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>In bytes. 0 for unlimited.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="downloadLimitBites"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Download Limit</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>In bytes. 0 for unlimited.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90"
            >
              Add User
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
