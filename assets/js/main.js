document.addEventListener("DOMContentLoaded", () => {
  // ============ Configuração da mensagem variável ============ \\

  // Obter a hora atual
  const now = new Date();
  const hour = now.getHours();

  // Definir a saudação com base na hora atual
  let greeting = "";

  if (hour >= 6 && hour < 12) {
    greeting =
      "<strong>Bom dia!</strong> Comece o dia com o <strong>pé direito e um sorriso</strong> no rosto! Vamos arrasar juntos!";
  } else if (hour >= 12 && hour < 19) {
    greeting = "<strong>Boa tarde!</strong> Dê um up no seu visual e <strong>sinta-se confiante</strong> com as nossas roupas! Você merece o melhor!";
  } else if (hour >= 19 && hour < 24) {
    greeting = "<strong>Boa noite!</strong> Termine o dia em grande estilo e prepare-se para sonhar com as nossas roupas! Durma bem e <strong>sonhe alto!</strong>";
  } else {
    greeting = "<strong>Boa madrugada!</strong> Relaxe e <strong>descanse com estilo</strong> com as nossas roupas! Durma bem e sonhe com o que há de melhor!";
  }

  // Coloque a saudação em algum lugar no seu documento HTML
  const greetingElement = document.getElementById("header-greeting");
  if (greetingElement) {
    greetingElement.innerHTML = greeting;
  }
});