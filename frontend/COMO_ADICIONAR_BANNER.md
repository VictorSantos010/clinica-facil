# Como Adicionar Banner na Home

## 📁 Onde colocar a imagem do banner

Coloque sua imagem de banner na seguinte pasta:

```
frontend/public/images/banners/banner-home.jpg
```

### Estrutura de pastas criada:
- ✅ `frontend/public/images/banners/` - Para banners e imagens hero
- ✅ `frontend/src/assets/images/` - Para outras imagens do projeto

## 📝 Passos para adicionar o banner

1. **Coloque sua imagem na pasta:**
   ```
   frontend/public/images/banners/banner-home.jpg
   ```

2. **Formatos aceitos:**
   - JPG/JPEG
   - PNG
   - WebP (recomendado para melhor performance)

3. **Tamanho recomendado:**
   - **Largura:** 1920px (ou maior)
   - **Altura:** 500-600px
   - **Proporção:** 16:9 ou similar
   - **Peso:** Máximo 500KB (otimize antes de adicionar)

## 🎨 Como funciona

O banner já está configurado no código! Quando você adicionar a imagem `banner-home.jpg` na pasta `frontend/public/images/banners/`, ela aparecerá automaticamente na home.

### Caminho da imagem no código:
```jsx
<img src="/images/banners/banner-home.jpg" alt="Clínica Fácil" />
```

## 🔄 Se quiser usar outro nome de arquivo

Se sua imagem tiver outro nome (ex: `meu-banner.png`), edite o arquivo:

**Arquivo:** `frontend/src/components/Home.js`

**Linha ~59:** Altere o caminho:
```jsx
src="/images/banners/meu-banner.png"
```

## ✨ Recursos implementados

- ✅ Banner responsivo (ajusta automaticamente em mobile)
- ✅ Overlay branco translúcido para melhor legibilidade do texto
- ✅ Fallback: se a imagem não existir, mostra apenas o conteúdo
- ✅ Efeito de fade-in suave
- ✅ Conteúdo sobreposto ao banner com fundo semi-transparente

## 📱 Responsividade

- **Desktop:** Banner com 500px de altura
- **Mobile:** Banner com 350px de altura
- O conteúdo se ajusta automaticamente

## 💡 Dicas

1. **Otimize a imagem:** Use ferramentas como TinyPNG ou Squoosh para reduzir o tamanho
2. **Formato WebP:** Melhor compressão e qualidade
3. **Alt text:** Já configurado para acessibilidade
4. **Lazy loading:** Considere adicionar `loading="lazy"` se a imagem for muito grande

