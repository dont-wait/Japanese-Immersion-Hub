{
  description = "Java 25 and Maven 3.9 Development Environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, utils }:
    utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            jdk25 # The latest Java version
            maven # Maven 3.9.x
          ];

          shellHook = ''
            export JAVA_HOME=${pkgs.jdk25.home}
            echo "------------------------------------------"
            echo "🚀 Java 25 & Maven 3.9 Dev Shell Active"
            echo "JDK Path: $JAVA_HOME"
            java -version
            mvn -version
            echo "------------------------------------------"
          '';
        };
        checks = {
          build = pkgs.stdenv.mkDerivation {
            name = "java-project-test";
            src = ./.;
            buildInputs = [ pkgs.jdk25 pkgs.maven ];
            buildPhase = "mvn test"; # Lệnh chạy test của Maven
            installPhase = "touch $out";
          };
        };
      });
}