'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import Image from 'next/image';
import { AlertCircle, Image as ImageIcon, Loader2, Send } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { AnalysisResults } from './analysis-results';

type Action = (prevState: any, formData: FormData) => Promise<{ result: any; error: string | null; timestamp: number; }>;

function SubmitButton({ icon, text }: { icon: React.ReactNode, text: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          {icon}
          {text}
        </>
      )}
    </Button>
  );
}

export function AnalysisForm({
  analyzeContent,
  analyzeImage,
}: {
  analyzeContent: Action;
  analyzeImage: Action;
}) {
  const { toast } = useToast();
  const [contentState, contentAction] = useActionState(analyzeContent, { result: null, error: null, timestamp: 0 });
  const [imageState, imageAction] = useActionState(analyzeImage, { result: null, error: null, timestamp: 0 });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const activeState = contentState.timestamp > imageState.timestamp ? contentState : imageState;

  useEffect(() => {
    if (activeState.error) {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: activeState.error,
      });
    }
  }, [activeState, toast]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text">Text or URL</TabsTrigger>
          <TabsTrigger value="image">Image</TabsTrigger>
        </TabsList>
        <TabsContent value="text">
          <form action={contentAction} className="space-y-4">
            <Textarea
              name="content"
              placeholder="Paste an article, text, or a URL to analyze..."
              className="min-h-[150px] text-base"
              required
            />
            <div className="flex justify-end">
              <SubmitButton icon={<Send className="mr-2 h-4 w-4" />} text="Analyze Text" />
            </div>
          </form>
        </TabsContent>
        <TabsContent value="image">
          <form action={imageAction} ref={formRef}>
            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="image-upload">Upload an Image</Label>
                <Input
                  id="image-upload"
                  name="image-file"
                  type="file"
                  accept="image/*"
                  ref={imageInputRef}
                  onChange={handleImageChange}
                  className="cursor-pointer"
                />
                <input type="hidden" name="image" value={imagePreview || ''} />
              </div>
              {imagePreview && (
                <div className="relative mt-4 h-64 w-full overflow-hidden rounded-md border">
                  <Image src={imagePreview} alt="Image preview" layout="fill" objectFit="contain" />
                </div>
              )}
              <div className="flex justify-end">
                <SubmitButton icon={<ImageIcon className="mr-2 h-4 w-4" />} text="Analyze Image" />
              </div>
            </div>
          </form>
        </TabsContent>
      </Tabs>

      {useFormStatus().pending && (
        <div className="mt-8 rounded-lg border bg-card p-8 text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-lg font-semibold">Performing analysis...</p>
          <p className="text-muted-foreground">This may take a few moments.</p>
        </div>
      )}

      {activeState.error && !useFormStatus().pending && (
         <Alert variant="destructive" className="mt-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Analysis Error</AlertTitle>
            <AlertDescription>{activeState.error}</AlertDescription>
          </Alert>
      )}

      {activeState.result && !useFormStatus().pending && <AnalysisResults result={activeState.result} />}
    </>
  );
}
