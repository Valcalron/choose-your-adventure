type Props = {
  onContinue: () => void;
};

export default function IntroPage({ onContinue }: Props) {
  return (
    <main className="screen intro-screen">
      <section className="panel intro-panel">
        <div className="step-marker">A branching Transformers story</div>
        <h1>Choose Your Adventure</h1>

        <div className="intro-copy">
          <p>
            The war did not begin with weapons. It began with a world divided by function,
            privilege, and the belief that every Cybertronian had a place they were never meant
            to leave.
          </p>

          <p>
            By the time the first shots were fired, Cybertron had already been breaking for a
            long time. Some rose to change it. Some fought to preserve it. Others were simply
            caught between them.
          </p>

          <p>
            As a Cybertronian, you will come online shortly after the war begins, before your
            loyalties, reputation, and place in the conflict have been decided.
          </p>

          <p>
            As a Human, your story begins on Earth in 1984, when impossible machines arrive from
            the stars and bring their ancient war with them.
          </p>

          <p>
            Your choices will shape more than which faction trusts you. They will define your
            personality, your relationships, the friends who stand beside you, the promises you
            keep, and the kind of person—or machine—you become.
          </p>

          <p className="intro-closing">
            The war has already begun. Your place in it has not.
          </p>
        </div>

        <div className="button-row">
          <button type="button" className="primary-button" onClick={onContinue}>
            Choose Your Origin
          </button>
        </div>
      </section>
    </main>
  );
}
