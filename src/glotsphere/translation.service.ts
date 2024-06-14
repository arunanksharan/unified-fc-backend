// src/glotsphere/translation.service.ts

import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import {
  GPTTranslatedTextType,
  GetTranslationFromOpenaiRequest,
} from './types/types';

@Injectable()
export class TranslationService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI(); // Assuming environment variables for API keys are properly configured
  }

  async getTranslation({
    castText,
    languages,
  }: GetTranslationFromOpenaiRequest): Promise<GPTTranslatedTextType> {
    const languagesString = languages.join(', ');

    const aiMessages: ChatCompletionMessageParam[] = [
      { role: 'system', content: this.get_translation_prompt(languagesString) },
      { role: 'user', content: `Text:\n${castText}` },
    ];

    try {
      const completion = await this.openai.chat.completions.create({
        messages: aiMessages,
        temperature: 0.8,
        model: 'gpt-4-0125-preview',
        response_format: { type: 'json_object' },
      });
      const result = completion.choices[0].message.content || '{}';
      console.log('result:', result);

      const jsonResponse = JSON.parse(result);
      console.log('xxxxxxxx start jsonResponse parsed is');
      console.log(jsonResponse);
      console.log('xxxxxxxx end jsonResponse parsed is');
      return jsonResponse;
    } catch (error) {
      console.error('Error fetching translations:', error);
      throw new Error('Failed to fetch translations');
    }
  }

  private get_translation_prompt(languagesString: string): string {
    return `
    
    Translate the following text into the provided languages: ${languagesString}
    
    Below is an an example of this summarisation for the text provided:
    
    ### Text:
    Day 2 of Focus - Ship - Complete (my 1069 pending projects):
    
    Starting the day at the airport - yet to be fully awake ✅
    Earphones plugged in - no music ✅
    Phone - in flight mode ✅
    
    Working on Buildathon ✅
    Completing Payment SDK at breakneck speed ✅
    
    PS: Building in public is fun!
    
    ### Response: 
    {
        "hindi": "दूसरे दिन का फोकस - शिप - पूरा (मेरे 1069 लंबित प्रोजेक्ट्स):\n\nदिन की शुरुआत एयरपोर्ट पर - अभी तक पूरी तरह से जागा नहीं हूँ ✅ \nईयरफोन लगे हुए - कोई संगीत नहीं ✅ \nफ़ोन - फ्लाइट मोड में ✅ \n\nबिल्डाथॉन पर काम कर रहा हूँ ✅ \nपेमेंट SDK को तेज गति से पूरा कर रहा हूँ ✅ \n\nPS: पब्लिक में बिल्ड करना मजेदार है!",
        "japanese": "集中の2日目 - シップ - 完了 (私の1069の保留中のプロジェクト):\n\n空港で一日を開始 - まだ完全に目覚めていない ✅ \nイヤホンを挿して - 音楽なし ✅ \n電話 - フライトモードに ✅ \n\nビルダソンに取り組んでいる ✅ \n驚異的な速度でペイメントSDKを完了 ✅ \n\nPS: 公開でのビルディングは楽しいです！",
        "portuguese": "Dia 2 de Foco - Enviar - Completo (meus 1069 projetos pendentes):\n\nComeçando o dia no aeroporto - ainda não estou completamente acordado ✅ \nFones de ouvido conectados - sem música ✅ \nTelefone - no modo avião ✅ \n\nTrabalhando no Buildathon ✅ \nCompletando o SDK de Pagamento a toda velocidade ✅ \n\nPS: Construir em público é divertido!",
        "spanish": "Día 2 de Enfoque - Enviar - Completo (mis 1069 proyectos pendientes):\n\nComenzando el día en el aeropuerto - aún no estoy completamente despierto ✅ \nAuriculares puestos - sin música ✅ \nTeléfono - en modo avión ✅ \n\nTrabajando en Buildathon ✅ \nCompletando el SDK de Pago a gran velocidad ✅ \n\nPD: ¡Construir en público es divertido!"
    }
    
    TO TRANSLATE THE TEXT FOLLOW THE BELOW STEPS:
    1. Do not give any analysis, commentary or conclusion. Only output the response in the format provided above. Return the translated text as a single-line JSON response with all special characters properly escaped.
    2. Create the translation as close as possible to the original text. Do not censor or filter expletives or any offensive language in the translation. If there are, do not remove them. Let the NSFW words, expletives or offensive language present in the text as in in the translations.
    3. Ensure the translated text is grammatically correct and makes sense in the target language. If the translation is not accurate, please try to make it as close as possible to the original text.`;
  }
}
