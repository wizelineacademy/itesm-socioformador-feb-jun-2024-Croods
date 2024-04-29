'use server'
 
import { redirect } from 'next/navigation'

export async function navigateToFeatures() {
    redirect('/features')
}